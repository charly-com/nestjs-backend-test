/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mocked_token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should register a user', async () => {
    const input = { email: 'test@example.com', password: 'password123' };
    mockPrismaService.user.create.mockResolvedValue({
      id: '1',
      email: input.email,
    });

    const result = await authService.register(input);
    expect(result.token).toBe('mocked_token');
    expect(mockPrismaService.user.create).toHaveBeenCalledWith({
      data: {
        email: input.email,
        password: expect.any(String),
      },
    });
  });

  it('should login a user', async () => {
    const input = { email: 'test@example.com', password: 'password123' };
    const hashedPassword = await bcrypt.hash(input.password, 10);
    mockPrismaService.user.findUnique.mockResolvedValue({
      id: '1',
      email: input.email,
      password: hashedPassword,
    });

    const result = await authService.login(input);
    expect(result.token).toBe('mocked_token');
  });

  it('should throw an error on invalid login', async () => {
    mockPrismaService.user.findUnique.mockResolvedValue(null);
    await expect(
      authService.login({ email: 'test@example.com', password: 'wrong' }),
    ).rejects.toThrow('Invalid credentials');
  });
});
