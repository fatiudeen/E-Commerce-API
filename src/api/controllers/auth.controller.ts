import { Request, Response, NextFunction } from 'express';
import { ErrorResponse, SuccessResponse } from '../helpers/response';
import authService from '../services/auth.service';

export default {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.login(req.body);
      SuccessResponse.send(res, result);
    } catch (error) {
      next(error);
    }
  },
  buyerReg: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.BuyerRegistration(req.body);
      req.login(result.result, (err) => {
        if (err) {
          throw new Error(err);
        }
      });
      SuccessResponse.send(res, result);
    } catch (error) {
      next(error);
    }
  },
  sellerReg: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.sellerRegistration(
        req.body,
        req.hostname
      );
      SuccessResponse.send(res, result);
    } catch (error) {
      next(error);
    }
  },
  verifyEmail: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.verifyEmail({ token: req.params.token });
      SuccessResponse.send(res, { message: 'user verified', user: result });
    } catch (error) {
      next(error);
    }
  },
  forgotPassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.getResetToken(
        { email: req.body.email },
        req.hostname
      );
      //send mail
      SuccessResponse.send(res, { message: 'email sent', data: result });
    } catch (error) {
      next(error);
    }
  },
  resetPassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.resetPassword({
        token: req.params.token,
        password: req.body.password,
      });
      SuccessResponse.send(res, { success: result });
    } catch (error) {
      next(error);
    }
  },
  passportLogin: (req: Request, res: Response) => {
    if (req.session.host) {
      res.redirect(req.session.host);
    } else {
      SuccessResponse.send(res, {
        success: true,
        message: 'user logged in successfully',
      });
    }
  },
  passportSaveHost: (req: Request, res: Response, next: NextFunction) => {
    req.session.host = <string>req.query?.host;
    next();
  },

  logout: (req: Request, res: Response /*, next: NextFunction*/) => {
    req.logout();
    // req.session.destroy((err) => {
    //   if (err) next(err);
    // });
    SuccessResponse.send(res, { message: 'successfully logged out' });
  },
};
