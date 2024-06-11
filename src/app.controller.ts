import { Controller, Post, Get, UseGuards, Body, Request } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LoginDto } from './login/login.dto';
import { RegisterDto } from './login/register.dto';
import { CreateAccountDto } from './accounts/dto/create-account.dto';
import { AuthGuard } from '@nestjs/passport';
import { AccountsService } from './accounts/accounts.service';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly accountsService: AccountsService,
    private readonly usersService: UsersService,
  ) { }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.login(loginDto);
    if (!token) {
      return { message: 'Invalid credentials' };
    }
    return token;
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    return { message: 'User registered successfully', user };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create-account')
  async createAccount(@Body() createAccountDto: CreateAccountDto) {
    const account = await this.accountsService.create(createAccountDto);
    return { message: 'Account created successfully', account };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.usersService.findById(req.user.userId);
    if (!user) {
      return { message: 'User not found' };
    }
    const { password, ...result } = user;
    return result;
  }
}
