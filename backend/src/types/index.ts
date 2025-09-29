export interface User {
  _id: String,
  username: String,
  email: String,
  DOB: Date
}

export interface UserType {
  _id: String,
  username: String,
  email: String,
  DOB: Date
}

export interface OtpType {
    email: String,
    otp: String,
    expiresAt: Date,
    attempts: Number
}

export interface NoteType {
    id: number;
    title: string;
    content: string;
    isLive: boolean;
}