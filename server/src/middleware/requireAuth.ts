import { Request, Response, NextFunction } from 'express';
import { getUserFromRequest } from '../controllers/authController.js';

/**
 * Rejects requests without a valid "Authorization: Bearer <token>" header.
 * The token is issued on signup/login and stored on the User document.
 */
export async function requireAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      res.status(401).json({ error: { message: 'Authentication required. Please log in.' } });
      return;
    }
    (req as any).user = user;
    next();
  } catch (err) {
    console.error('Auth check failed:', err);
    res.status(500).json({ error: { message: 'Authentication check failed.' } });
  }
}
