'use server';

// 'use server';

// import { model } from '@/ai/ai-instance';
// import { CategorizationSchema, SupplementCategorization } from '@/types/ai/index';

// const PROMPT_TEMPLATE = `Based on the supplement name "{supplementName}", suggest the most appropriate time of day (Morning, Noon, or Evening) and relation to food (Before Eating, With Food, or After Eating) categories. Also provide a brief reasoning for your suggestions.

// Please structure your response exactly as a JSON object with these fields:
// {
//   "suggestedTimeCategory": "Morning|Noon|Evening",
//   "suggestedMealCategory": "Before Eating|With Food|After Eating",
//   "reasoning": "Your reasoning here"
// }

// Supplement: {supplementName}`;

// export async function categorizeSupplement(
//   supplementName: string
// ): Promise<SupplementCategorization> {
//   try {
//     const prompt = PROMPT_TEMPLATE.replace('{supplementName}', supplementName);
    
//     const result = await model.generateContent(prompt);
//     const response = result.response;
//     const text = response.text();
    
//     // Parse the JSON response
//     const jsonResponse = JSON.parse(text);
    
//     // Validate the response against our schema
//     const validated = CategorizationSchema.parse(jsonResponse);
    
//     return validated;
//   } catch (error) {
//     console.error('Error categorizing supplement:', error);
//     throw new Error('Failed to categorize supplement');
//   }
// }



import { model } from '@/ai/ai-instance';
import { CategorizationSchema, SupplementCategorization } from '@/types/ai/index';


const PROMPT_TEMPLATE = `Analyze the supplement name "{supplementName}" and provide a recommendation for when to take it.

You must respond with a valid JSON object using exactly this format:
{
  "suggestedTimeCategory": "Morning",
  "suggestedMealCategory": "Before Eating",
  "reasoning": "Brief explanation here"
}

Rules:
- suggestedTimeCategory must be exactly "Morning", "Noon", or "Evening"
- suggestedMealCategory must be exactly "Before Eating", "With Food", or "After Eating"
- reasoning should be a brief, clear explanation
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