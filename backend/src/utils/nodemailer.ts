// below is how to get your own valid credentials for nodemailer

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// this will work locally and is more production ready but 
// currently render donot send stmp requests so using gmail for now
// also refreshToken only gives access for 7 days and requires additional setup
// to keep the token refreshed automatically

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     type: "OAuth2",
//     user: "jagdishdhukia770@gmail.com",
//     clientId: process.env.NODEMAILER_CLIENT_ID, 
//     clientSecret: process.env.NODEMAILER_CLIENT_SECRET,
//     refreshToken: process.env.NODEMAILER_REFRESH_TOKEN
//     },
// });

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Connection Error:", error);
  } else {
    console.log("SMTP server is ready to take messages:", success);
  }
});


// Create transporter using Oauth App password after enabling 2 step verification
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export default async function sendVerificationOtp(email: string, otp: string | number) {
    if (!email) console.error('Email is required');

    const mailOptions = {
        from: "TEAM NOTE_TAKER",
        to: email,
        subject: 'Email Verification OTP From Note_Taker',
        html: `
        <div style="font-family: Arial, sans-serif; padding: 10px;">
            <h1 style="color: #333;">Verify It's You for Note_Taker</h1>
            <p>Please verify yourself by entering the OTP below:</p>
            <p>Your OTP is <b style="color: blue; font-size: 40px;">${otp}</b>. It will expire in <b>5 minutes</b>.</p>
            <p>Thanks,</p>
            <p><strong>Team Note_Taker</strong></p>
        </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent successfully!');
        return true;
    } catch (error) {
        console.error('Error sending verification email:', error);
        return false;
    }
};
