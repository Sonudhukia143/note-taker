import { Router, Request, Response } from 'express';
import { AuthService } from '../services/authService.js';

export function createAuthRouter(): Router {
  const router = Router();

  const authService = new AuthService();

  router.post('/register', async (req: Request, res: Response) => {
    const { username, email, dob } = req.body;
    if (!username || !email || !dob) return res.status(400).json({ message: "Username, email and date of birth are required" });

    return await authService.register(req, res);
  });

  router.post('/login', async (req: Request, res: Response) => {
    const { username, email } = req.body;
    if (!username || !email) return res.status(400).json({ message: "Username and email are required" });

    return await authService.login(req, res);
  });

  router.post('/verify', async (req: Request, res: Response) => {
    const { username, email } = req.body;
    if (!username || !email) return res.status(400).json({ message: "Username and email are required" });

    return await authService.verifyotp(req, res);
  });

  router.post('/sync' , async (req: Request, res: Response) => {
    const NOTE = req.body;
    if (!NOTE) return res.status(400).json({ message: "Note data is required" });

    return await authService.syncNotes(req, res);
  })

  return router;
}