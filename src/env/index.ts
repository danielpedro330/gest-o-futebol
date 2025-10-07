import 'dotenv/config'
import { z } from 'zod'

const envShema = z.object({
    NODE_EN: z.enum(['dev', 'test', 'production']).default('dev'),
    PORT: z.coerce.number().default(3000),
})

const _env = envShema.safeParse(process.env)

if(_env.success === false) {
    console.error('❌ Invalid environment variables', _env.error.format())

    throw new Error('Invalid environment variables')
}

export const env = _env.data