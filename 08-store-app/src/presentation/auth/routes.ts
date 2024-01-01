import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService, EmailService } from "../services";
import { envs } from "../../config";


export class AuthRoutes {
  public static get routes(): Router {
    const router: Router = Router();
    const emailService = new EmailService(envs.MAILER_SERVICE, envs.MAILER_EMAIL, envs.MAILER_SECRET_PASSWORD, envs.SEND_EMAIL);
    const authService = new AuthService(emailService);
    const authController = new AuthController(authService);

    router.post('/login', authController.login);
    router.post('/register', authController.register);
    router.get('/validate-email/:token', authController.validateEmail);

    return router;
  }
}