import { InputType, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class BiometricLoginInput {
  @Field()
  @MinLength(10)
  biometricKey: string;
}
