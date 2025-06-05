import { FoodRelation, TimeOfDay } from '@/types';
import { z } from 'zod';

export const CategorizationSchema = z.object({
  suggestedTimeCategory: z.nativeEnum(TimeOfDay),
  suggestedMealCategory: z.nativeEnum(FoodRelation),
  reasoning: z.string()
});

export type SupplementCategorization = z.infer<typeof CategorizationSchema>;