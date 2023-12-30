import { Bcrypt, JwtAdapter, envs } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { EmailService } from "./email.service";

export class AuthService {
  constructor (
    private readonly emailService: EmailService
  ) {}

  public async registerUser (registerUserDto: RegisterUserDto) {
    const existsUser = await UserModel.findOne({email: registerUserDto.email});
    if (existsUser) throw CustomError.badRequest('Email Already Exists');
    try {
      const user = await UserModel.create(registerUserDto);
      // Hash password
      user.password = Bcrypt.hash(registerUserDto.password);

      // Send email
      this.sendConfirmationEmail(user.email);
      
      await user.save();
      const { password, ...userEntity} = UserEntity.fromObject(user);
      const token = await JwtAdapter.generateToken({id: userEntity.id, email: userEntity.email}, '1h', envs.JWT_SEED);
      if (!token) {
        throw CustomError.internalServerRequest('Error while creating token');
      }
      return {
        user: userEntity, 
        token: token
      };
    } catch (error) {
      throw CustomError.internalServerRequest(`${error}`);
    }
  }

  public async loginUser (loginUserDto: LoginUserDto) {
    try {
      const existsUser = await UserModel.findOne({email: loginUserDto.email});

      if (!existsUser) {
        throw CustomError.badRequest('User doest not exists');
      }

      const isMatchedPasswords = Bcrypt.compare(loginUserDto.password, existsUser.password);

      if (!isMatchedPasswords) {
        throw CustomError.badRequest('Incorrect credentials');
      }

      // if (!existsUser.emailValidated) {
      //   throw CustomError.badRequest(`the user needs validate your email, you come on your email and click the link`);
      // }
      const {password, ...userEntity} = UserEntity.fromObject(existsUser);
      const token = await JwtAdapter.generateToken({id: userEntity.id, email: userEntity.email}, '1h',  envs.JWT_SEED);
      if (!token) {
        throw CustomError.internalServerRequest('Error while creating token!')
      }
      return {
        user: userEntity,
        token: token,
      };
    } catch (error) {
      throw CustomError.internalServerRequest(`${error}`);
    }
  }

  private sendConfirmationEmail = async (email: string) => {
    const token = await JwtAdapter.generateToken({email: email}, '1h', envs.JWT_SEED);
    if (!token) throw CustomError.internalServerRequest('Error Getting Token');
    const link = `${envs.WEB_SERVICE_URL}/auth/validate-email/${token}`;
    const htmlBody = `
      <h1>Validate your email</h1>
      <p>Click on the following link to validate your email</p>
      <a href="${link}">Validate Your Email: ${email}</a>
    `;

    const options = {
      to: email,
      subject: 'Validate Your Email',
      htmlBody: htmlBody
    }

    const isSent = await this.emailService.sendEmail(options);

    if (!isSent) {
      throw CustomError.internalServerRequest('Error sending email');
    }
    return true;
  }

  public validateEmail = async (token: string) => {
    const payload = await JwtAdapter.validateToken(token);
    if (!payload) throw CustomError.unauthorizedRequest('Invalid Token');

    const {email} = payload as {email: string};
    if (!email) throw CustomError.internalServerRequest('Email not in token');

    const user = await UserModel.findOne({email});
    if (!user) throw CustomError.internalServerRequest('Email not exists');

    // SI LLEGA HASTA AQUI SIGNIFICA QUE EL USUARIO VIO SU CORREO Y EL TOKEN ES CORRECTO, MUY UTIL PARA MANDAR UN ACUERDO DE CONFIDENCIALIDAD O PDF VER SI ESTA DE ACUERDO
    user.emailValidated = true;
    await user.save();
    return true;
  }
}