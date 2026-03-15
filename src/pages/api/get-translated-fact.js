import { TranslationServiceClient } from '@google-cloud/translate';

// API routes export functions for HTTP methods like GET, POST, etc.
export async function GET() {
  // All your secret logic lives here, safely on the server
  const factApiKey = import.meta.env.PUBLIC_API_NINJAS_KEY;
  const projectId = import.meta.env.GOOGLE_PROJECT_ID;

  try {
    // 1. Fetch the fact in English
    const factResponse = await fetch('https://api.api-ninjas.com/v1/facts', {
      headers: { 'X-Api-Key': factApiKey }
    });

    if (!factResponse.ok) {
      throw new Error('Failed to fetch fact');
    }

    const facts = await factResponse.json();
    const englishFact = facts[0].fact;
    const swedishFact = null;

    // // 2. Translate the fact to Swedish
    // const translationClient = new TranslationServiceClient();
    // const request = {
    //   parent: `projects/${projectId}/locations/global`,
    //   contents: [englishFact],
    //   mimeType: 'text/plain',
    //   targetLanguageCode: 'sv',
    // };
    // const [translationResponse] = await translationClient.translateText(request);
    // const swedishFact = translationResponse.translations[0].translatedText;

    // 3. Return the final data as JSON
    return new Response(
      JSON.stringify({ fact: swedishFact ? swedishFact : englishFact }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("API Route Error:", error);
    return new Response(JSON.stringify({ error: 'Failed to process request' }), {
      status: 500
    });
  }
}