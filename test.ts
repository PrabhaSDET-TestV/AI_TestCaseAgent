import OpenAI from 'openai';
import { config } from 'dotenv';

config(); // Load environment variables

const openai = new OpenAI({
  apiKey: process.env.API_KEY, // Use the API key from .env
  baseURL: 'https://integrate.api.nvidia.com/v1',
});

async function generateTestCase(userStory: string) {
  const completion = await openai.chat.completions.create({
    model: "meta/llama-3.2-3b-instruct",
    messages: [
      {
        "role": "user",
        "content": `
          You are an expert test case generation assistant. Your task is to generate a structured test case based on a given user story.

          ### **Instructions:**
          - Understand the user story and derive key functional steps.
          - Provide **clear and concise steps** for test execution.
          - Ensure the **expected outcome** aligns with the user story’s intent.
          - Output in **strict JSON format** as shown in the example.

          ### **Example:**
          **User Story:**  
          "As a user, I want to reset my password so I can regain access to my account."

          **Expected Output:**
          \`\`\`json
          {
            "testCaseTitle": "Password Reset Functionality",
            "steps": [
              "Click on 'Forgot Password'",
              "Enter the registered email",
              "Check email for reset link",
              "Follow link and set new password"
            ],
            "expectedOutcome": "Password is updated and login is successful."
          }
          \`\`\`

          ### **User Story:**
          "${userStory}"

          ### **Expected Output:**
        `
      }
    ],
    temperature: 0.2,
    top_p: 0.7,
    max_tokens: 1024,
  });

  return completion.choices[0]?.message?.content || "Error generating test case";
}

// Run a test
async function test() {
  const userStory = "As a language learner, I want an offline mode in the language learning app, so I can continue learning without an internet connection."
  const testCase = await generateTestCase(userStory);
  console.log("Generated Test Case: ");
  console.log(testCase);
}

test();
