/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';
import { BiometricLoginInput } from './dto/biometric-login.input';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(input: RegisterInput): Promise<{ token: string }> {
    const hashedPassword = await bcrypt.hash(input.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: input.email,
        password: hashedPassword,
      },
    });
    const payload = { sub: user.id, email: user.email };
    return { token: this.jwtService.sign(payload) };
  }

  async login(input: LoginInput): Promise<{ token: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: input.email },
    });
    if (
      !user ||
      !user.password ||
      !(await bcrypt.compare(input.password, user.password))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, email: user.email };
    return { token: this.jwtService.sign(payload) };
  }

  async biometricLogin(input: BiometricLoginInput): Promise<{ token: string }> {
    const user = await this.prisma.user.findUnique({
      where: { biometricKey: input.biometricKey },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid biometric key');
    }
    const payload = { sub: user.id, email: user.email };
    return { token: this.jwtService.sign(payload) };
  }

  async validateUser(userId: string) {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }
}
