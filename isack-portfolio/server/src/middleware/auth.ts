import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'

export interface AuthRequest extends Request {
  userId?: string
}

export function signToken(userId: string): string {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '7d',
  })
}

export function authGuard(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  const token = header.split(' ')[1]
  try {
    const payload: any = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    req.userId = payload.userId
    next()
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}
