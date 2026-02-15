import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";

// --------------------
// Schema
// --------------------
const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    company: z.string().describe("The name of the company"),
    role: z.string().describe("Job title or internship role"),
    location: z.string().describe("City or 'Remote'"),
    duration: z.string().describe("Length of internship e.g. '3 months'"),
    deadline: z.string().describe("The deadline date in YYYY-MM-DD format"),
    stipend: z.string().describe("Monthly stipend or annual salary"),
  })
);

// --------------------
// Main Function
// --------------------
export const analyzeJobDescription = async (text) => {
  // FREE Groq model (working 2026)
  const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama-3.3-70b-versatile",
    temperature: 0,
  });

  const formatInstructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template: `
Extract structured job info.
Return ONLY valid JSON.

{format_instructions}

Job Text:
{jobText}
`,
    inputVariables: ["jobText"],
    partialVariables: { format_instructions: formatInstructions },
  });

  try {
    const input = await prompt.format({ jobText: text });

    const response = await model.invoke(input);

    let content = response.content ?? "";

    // Remove markdown blocks if present
    content = content.replace(/```json/g, "").replace(/```/g, "");

    // Extract JSON safely
    const match = content.match(/\{[\s\S]*\}/);
    if (match) content = match[0];

    const parsed = await parser.parse(content.trim());
    return parsed;

  } catch (error) {
    console.error("AI Extraction Error:", error);
    throw new Error("Failed to parse text with AI");
  }
};
