import z from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  CLOUDFLARE_ACCOUNT_ID: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_BUCKET_NAME: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('❌ Invalid environment variable', _env.error.format());

  throw new Error('Invalid environment variables.');
}

export const env = _env.data;
