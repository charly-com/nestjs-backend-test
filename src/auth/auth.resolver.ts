/* eslint-disable prettier/prettier */
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';
import { BiometricLoginInput } from './dto/biometric-login.input';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String)
  async register(@Args('input') input: RegisterInput): Promise<string> {
    const { token } = await this.authService.register(input);
    return token;
  }

  @Mutation(() => String)
  async login(@Args('input') input: LoginInput): Promise<string> {
    const { token } = await this.authService.login(input);
    return token;
  }

  @Mutation(() => String)
  async biometricLogin(
    @Args('input') input: BiometricLoginInput,
  ): Promise<string> {
    const { token } = await this.authService.biometricLogin(input);
    return token;
  }
}
