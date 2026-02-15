import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    company: z.string(),
    companyDiscription: z.string().describe(
      "3 line factual description of the company (what they do). NOT 'we are hiring'"
    ),
    role: z.string(),
    location: z.string().optional(),
    duration: z.string().optional(),
    stipend: z.string().optional(),
    deadline: z.string(),
    requirements: z.string().describe(
      "A clear string of required skills or qualifications, separated by commas if multiple."
    ),
  })
);

export const analyzeJobDescription = async (text) => {
  const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama-3.3-70b-versatile",
    temperature: 0,
  });

  const formatInstructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template: `
Extract job info and return ONLY JSON.

IMPORTANT RULES:
- companyDiscription must describe what the company does (e.g., "Google is a tech giant specializing in search engines and AI.")
- requirements must be a concise string of skills (e.g., "React, Node.js, TypeScript, and Problem Solving.")
- DO NOT write: "is hiring", "looking for", "our company"
- Write factual info only
- 3 short lines only for companyDiscription
- if not found return empty Strings

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
    content = content.replace(/```json/g, "").replace(/```/g, "");

    const match = content.match(/\{[\s\S]*\}/);
    if (match) content = match[0];

    const parsed = await parser.parse(content.trim());

    const result = {
      company: parsed.company,
      companyDiscription: parsed.companyDiscription,
      role: parsed.role,
      requirements: parsed.requirements || "", // Added requirements here
      location: parsed.location || "Remote",
      duration: parsed.duration || "",
      stipend: parsed.stipend || "",
      deadline: parsed.deadline,
    };

    return result;

  } catch (err) {
    console.error("AI Extraction Error:", err);
    throw new Error("Failed to parse job description");
  }
};