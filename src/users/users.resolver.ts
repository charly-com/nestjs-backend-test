/* eslint-disable prettier/prettier */
import { Resolver, Query, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => String)
  @UseGuards(JwtAuthGuard)
  async me(@Context() context) {
    const user = context.req.user;
    return user.email;
  }
}