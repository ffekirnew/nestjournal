import { Body, Controller, NotFoundException, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Creates a new user.
   * 
   * @param authCredentialsDto The data for the sign up.
   * @returns A promise that relises to a User.
   */
  @Post("signup")
  async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
    await this.authService.signUp(authCredentialsDto);
  }
}
