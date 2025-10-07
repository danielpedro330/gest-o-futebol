import { z } from 'zod';
import type { ZodIssue } from 'zod';

export class userValidator {
    private schema = z.object({
        name: z.string().min(1, 'Nome é obrigatório'),
        email: z.email('E-mail inválido'),
        password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
    });

    validate(data: unknown): boolean {
        const result = this.schema.safeParse(data);
        return result.success;
    }

    getErrors(data: unknown): string[] {
        const result = this.schema.safeParse(data);
        if (result.success) return [];
        return result.error.issues.map((e: ZodIssue) => e.message);
    }
}