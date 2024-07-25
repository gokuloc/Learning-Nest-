import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

enum Environmnet {
  Development = 'development',
  Production = 'production',
  Staging = 'staging',
  Test = 'test',
}

class EnvironmnetVariables {
  @IsEnum(Environmnet)
  NODE_ENV: Environmnet;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_HOST: string;

  @IsString()
  DB_NAME: string;

  @IsString()
  DB_USER: string;

  @IsString()
  DB_PASS: string;

  @IsString()
  SECRET: string;

  @IsNumber()
  PORT: number;
}

export function validate(config: Record<string, unknown>) {
  console.log('config : ', config);
  const validatedConfig = plainToInstance(EnvironmnetVariables, config, {
    enableImplicitConversion: true,
  });
  console.log('validatedConfig : ', validatedConfig);
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
