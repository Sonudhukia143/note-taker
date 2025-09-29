import jwt from 'jsonwebtoken';

export default function generateToken(userId: string) {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET || 'supersecretkey', {
        expiresIn: '1d', // Token expires in 1 day
    });
    return token;
}