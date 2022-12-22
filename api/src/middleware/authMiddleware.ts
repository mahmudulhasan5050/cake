import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError, ForbiddenError } from '../apiErrors/apiErrors';
import { secret } from '../controller/auth';
import { UserType } from '../models/Users';
import { TokenData } from '..';

type Asss = {
  phone: string;
  id: string;
};

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: string | undefined = req.headers.authorization?.split(' ')[1];

    if (!token) throw new UnauthorizedError();

    if (token) {
      jwt.verify(token, secret) as TokenData;
      req.tokenData;
      next();
    } else {
      throw new ForbiddenError();
    }
  } catch (error) {
    console.log(error);
  }
};

export default authMiddleware;
