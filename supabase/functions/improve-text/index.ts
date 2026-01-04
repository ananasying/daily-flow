import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text } = await req.json();

    if (!text || text.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'No text provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Improving text:', text.substring(0, 100) + '...');

    // TODO: Replace with actual LangGraph API call
    // const LANGGRAPH_API_URL = Deno.env.get('LANGGRAPH_API_URL');
    // const LANGGRAPH_API_KEY = Deno.env.get('LANGGRAPH_API_KEY');
    // const response = await fetch(LANGGRAPH_API_URL, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${LANGGRAPH_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ text }),
    // });

    // Mock response - simulating AI suggestions
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API latency

    const suggestions = generateMockSuggestions(text);

    return new Response(
      JSON.stringify({ suggestions }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Error improving text:', error);
    const message = error instanceof Error ? error.message : 'Failed to improve text';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function generateMockSuggestions(text: string): string[] {
  // Generate mock improved versions of the text
  const baseText = text.trim();
  
  if (baseText.length < 10) {
    return [
      `${baseText} - Consider expanding this thought.`,
      `I ${baseText.toLowerCase()}.`,
      `Today, ${baseText.toLowerCase()}.`,
    ];
  }

  // Create variations that "improve" the text
  const suggestions = [
    // More formal version
    `${capitalizeFirst(baseText)}${baseText.endsWith('.') ? '' : '.'}`,
    // Add transitional phrase
    `Furthermore, ${baseText.toLowerCase()}${baseText.endsWith('.') ? '' : '.'}`,
    // More descriptive version
    `I found that ${baseText.toLowerCase()}${baseText.endsWith('.') ? '' : '.'}`,
    // Reflective version
    `Upon reflection, ${baseText.toLowerCase()}${baseText.endsWith('.') ? '' : '.'}`,
    // Concise version
    shortenText(baseText),
  ].filter((s, i, arr) => arr.indexOf(s) === i); // Remove duplicates

  return suggestions.slice(0, 4);
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function shortenText(text: string): string {
  const words = text.split(' ');
  if (words.length <= 5) return text;
  return words.slice(0, Math.ceil(words.length * 0.7)).join(' ') + '...';
}
