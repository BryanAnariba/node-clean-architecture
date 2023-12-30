import { Request ,Response } from "express";
import { CustomError, LoginUserDto, RegisterUserDto } from "../../domain";
import { AuthService } from "../services/auth.service";

export class AuthController {

  constructor (
    private readonly authService: AuthService,
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) return res.status(error.statusCode).json({error: error.message});
    return res.status(500).json({error: error});
  }

  public login = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);

    if (error) return res.status(400).json({error: error});

    this.authService.loginUser(loginUserDto!)
      .then(
        user => {
          return res.status(200).json(user);
        }
      )
      .catch(error => this.handleError(error, res));
  }

  public register = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({error: error});

    this.authService
    .registerUser(registerUserDto!)
      .then(user => {
        return res.status(201).json(user);
      })
      .catch((error) => this.handleError(error, res));
  }

  public validateEmail = (req: Request, res: Response) => {
    const {token} = req.params;
    this.authService.validateEmail(token)
      .then(isValidated => res.status(200).json({message: 'Email Validated'}))
      .catch(error => this.handleError(error, res));
  }
}