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