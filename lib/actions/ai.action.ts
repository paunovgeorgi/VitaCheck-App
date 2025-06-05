'use server';

import { model } from '@/ai/ai-instance';
import { CategorizationSchema, SupplementCategorization } from '@/types/ai/index';


const PROMPT_TEMPLATE = `Analyze the supplement name "{supplementName}" and provide a recommendation for when to take it.

You must respond with a valid JSON object using exactly this format:
{
  "suggestedTimeCategory": "Morning",
  "suggestedMealCategory": "Before Eating",
  "reasoning": "Brief explanation here for your suggestion"
}

Rules:
- suggestedTimeCategory must be exactly "Morning", "Noon", or "Evening"
- suggestedMealCategory must be exactly "Before Eating", "With Food", or "After Eating"
- reasoning should be a brief, clear explanation for the suggestion
- Response must be valid JSON only, no additional text

Supplement to analyze: {supplementName}`;

export async function categorizeSupplement(
  supplementName: string
): Promise<SupplementCategorization> {
  if (!supplementName.trim()) {
    throw new Error('Supplement name is required');
  }

  try {
        const prompt = PROMPT_TEMPLATE.replace('{supplementName}', supplementName);
    
    const result = await model.generateContent(prompt);
    if (!result || !result.response) {
      console.error('Empty response from AI model');
      throw new Error('AI model returned empty response');
    }

    let text = result.response.text();
    
    // Clean up the response by removing Markdown code block syntax
    text = text.replace(/```json\n/, '').replace(/\n```$/, '');
    console.log('Cleaned AI Response:', text); // Debug log

    try {
      const jsonResponse = JSON.parse(text);
      console.log('Parsed JSON:', jsonResponse); // Debug log

      const validated = CategorizationSchema.parse(jsonResponse);
      console.log('Validated response:', validated); // Debug log

      return validated;
    } catch (parseError) {
      console.error('Parse/Validation Error:', parseError);
      if (parseError instanceof SyntaxError) {
        throw new Error('AI returned invalid JSON format');
      }
      if (parseError instanceof Error) {
        throw new Error(`Schema validation failed: ${parseError.message}`);
      }
      throw parseError;
    }
  } catch (error) {
    console.error('AI Service Error:', error);
    
    if (error instanceof Error) {
      // Check for specific error types
      if (error.message.includes('API key')) {
        throw new Error('AI service configuration error');
      }
      if (error.message.includes('rate limit')) {
        throw new Error('AI service is temporarily unavailable (rate limit)');
      }
      // Pass through our custom error messages
      if (error.message.includes('AI returned invalid JSON') || 
          error.message.includes('Schema validation failed') ||
          error.message.includes('AI model returned empty')) {
        throw error;
      }
    }
    
    throw new Error(`Failed to categorize supplement: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}