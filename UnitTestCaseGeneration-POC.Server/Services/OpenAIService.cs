using Microsoft.AspNetCore.Mvc;
using OpenAI.Chat;
using UnitTestCaseGeneration_POC.Server.Models;

namespace UnitTestCaseGeneration_POC.Server.Services
{
    public class OpenAIService : IOpenAIService
    {
        public async Task<JsonResult> GenerateUnitTestCases(string prompt)

        {
            try
            {
                ChatClient client = new(model: "gpt-3.5-turbo", Environment.GetEnvironmentVariable("OPENAI_API_KEY"));

                SystemChatMessage systemMessage = new SystemChatMessage("You are a helpful assistant, who generates unit tests cases and unit test code from a code snippet provided to you in the same language. Start with generating a comprehensive list of unit test cases for the supplied code followed by the unit test code for each of the identified test cases. In the event user has not provided a code example then respond politely asking to enter a valid code example.");
                UserChatMessage userPrompt = new UserChatMessage(prompt);

                ChatCompletion chatCompletion = await client.CompleteChatAsync([systemMessage, userPrompt]);

                return new JsonResult(new { success = true, output = chatCompletion.ToString() });
            }
            catch (Exception ex)
            {
                return new JsonResult(new { success = false, output = $"Error generating unit test cases. {ex.Message}" });
            }

        }
    }
}
