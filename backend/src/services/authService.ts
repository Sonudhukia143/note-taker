import { NOTE } from '../models/Note.js';
import { OTP } from '../models/Otp.js';
import User from '../models/User.js';
import { NoteType, OtpType, UserType } from '../types/index.js';
import generateToken from '../utils/generateToken.js';
import sendVerificationOtp from '../utils/nodemailer.js';
import { Request, Response } from 'express';

export class AuthService {
    // private apiUrl: string;

    //   constructor(
    //     apiUrl: string = process.env.API_BASE_URL || 'http://localhost:3000/api',
    //   ) {
    //     this.apiUrl = apiUrl;
    //   }

    async register(req: Request, res: Response) {
        try {
            const { username, email, dob } = req.body;
            if (!email || !username || !dob) return res.status(400).json({ message: "Email, username and date of birth are required" });

            const isUserExists: UserType[] = await User.find({
                $or: [
                    { username: username },
                    { email: email }
                ]
            });
            if (isUserExists?.length > 0) return res.status(409).json({ message: "User already exists" });

            // // send otp for validation here
            const otpExist: OtpType | null = await OTP.findOne({ email });
            // if (otpExist && otpExist?.expiresAt < new Date(Date.now())) return res.status(401).json({ message: "OTP Already Expired Resend It." });
            if (otpExist) {
                await OTP.findOneAndDelete({ email });
            }

            const otpValue = Math.floor(1000 + Math.random() * 9000);
            const otpSchema = await OTP.create({
                email: email,
                otp: otpValue,
                createdAt: new Date(),
                expiresAt: new Date(new Date().getTime() + 5 * 60000)
            });
            const savedOtp = await otpSchema.save();
            if (!savedOtp) return res.status(500).json({ message: "Error saving OTP" });

            const isOtpSent = await sendVerificationOtp(email, otpValue);
            if (!isOtpSent) return res.status(500).json({ message: "Error sending OTP" });

            return res.status(200).json({ message: "OTP sent to email" });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async login(req: Request, res: Response) {
        console.log("Login request received");
        try {
            const { username, email } = req.body;
            if (!email || !username) return res.status(400).json({ message: "Email and username are required" });

            const user: UserType[] = await User.find({
                $or: [
                    { username: username },
                    { email: email }
                ]
            });
            if (user.length === 0) return res.status(404).json({ message: "User not found" });

            // // send otp for validation here
            const otpExist: OtpType | null = await OTP.findOne({ email });
            // if (otpExist && otpExist?.expiresAt < new Date(Date.now())) return res.status(401).json({ message: "OTP Already Expired Resend It." });
            if (otpExist) {
                await OTP.findOneAndDelete({ email });
            }

            const otpValue = Math.floor(1000 + Math.random() * 9000);
            const otpSchema = await OTP.create({
                email: email,
                otp: otpValue,
                createdAt: new Date(),
                expiresAt: new Date(new Date().getTime() + 5 * 60000)
            });
            const savedOtp: OtpType = await otpSchema.save();
            if (!savedOtp) return res.status(500).json({ message: "Error saving OTP" });

            const isOtpSent = await sendVerificationOtp(email, otpValue);
            if (!isOtpSent) return res.status(500).json({ message: "Error sending OTP" });

            return res.status(200).json({ message: "OTP sent to email" });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async verifyotp(req: Request, res: Response) {
        try {
            const { email, username, dob, otp } = req.body;
            if (!otp) return res.status(400).json({ message: "OTP is required" });
            if (Number(otp) < 1000 || Number(otp) > 9999) return res.status(400).json({ message: "Invalid OTP" });

            const isOtpSent: OtpType | null = await OTP.findOne({ email });
            if (isOtpSent && isOtpSent?.expiresAt < new Date(Date.now())) return res.status(401).json({ message: "OTP Already Expired Resend It." });
            if (!isOtpSent) return res.status(404).json({ message: "There has been no otp request please send it." });

            if (Number(isOtpSent?.attempts) >= 5) {
                await OTP.findOneAndDelete({ email });
                return res.status(404).json({ message: "Limits of attempts reached resend OTP." });
            }

            if (otp == isOtpSent.otp && !dob) {
                await OTP.findOneAndDelete({ email });
                const user = await User.findOne({ email });
                if (!user) return res.status(404).json({ message: "User not found" });

                const jwtToken = generateToken(user._id.toString());
                return res.status(200).json({ message: "Verification succesfully done.", token: jwtToken, user: user });
            } else if (otp == isOtpSent.otp && dob && username) {
                await OTP.findOneAndDelete({ email });

                const user = new User({
                    username: username,
                    email: email,
                    DOB: dob
                });

                const savedUser = await user.save();
                if (!savedUser) return res.status(500).json({ message: "Error saving user" });

                const jwtToken = generateToken(savedUser._id.toString());

                return res.status(201).json({ user: savedUser, token: jwtToken });
            } else {
                return res.status(404).json({ message: "Something went wrong refresh and retry" });
            }
        } catch (error) {
            return res.status(404).json({ message: error });
        }
    }

    async syncNotes(req: Request, res: Response) {
        try {
            const noteData: NoteType[] = req.body;
            console.log(noteData);

            if (noteData.length <= 0) return res.status(400).json({ message: "Note data is required" });

            await Promise.all(noteData.map(async (note1) => {
                const { title, content } = note1;
                if (!title || !content) return res.status(400).json({ message: "All fields are required" });

                const existingNote = await NOTE.findOne({ title });
                if (existingNote) {
                    existingNote.title = title;
                    existingNote.content = content;

                    await existingNote.save();
                    return;
                } else {
                    const newNote = new NOTE({
                        title,
                        content
                    });
                    await newNote.save();
                    return;
                }
            }));

            const notes = await NOTE.find({});
            return res.status(200).json({ message: "Note synced successfully", note: notes });
            
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}