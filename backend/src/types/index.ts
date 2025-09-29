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
<<<<<<< HEAD
=======
}

export interface NoteType {
    id: number;
    title: string;
    content: string;
    isLive: boolean;
>>>>>>> 60c2d84 (Dashboard : Note data and Dashboard add with live sync service)
}