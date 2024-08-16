using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using OpenAI;
using OpenAI.Chat;
using System.Text;
using UnitTestCaseGeneration_POC.Server.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UnitTestCaseGeneration_POC.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenerateUnitTestCaseController : ControllerBase
    {

        [EnableCors("AllowOrigin")]
        [HttpPost("GenerateUnitTestFromSnippet")]
        public async Task<JsonResult> GenerateUnitTestFromSnippet([FromBody] SnippetInput snippetInput)
        {
            try
            {
                ChatClient client = new(model: "gpt-3.5-turbo", Environment.GetEnvironmentVariable("OPENAI_API_KEY"));

                SystemChatMessage systemMessage = new SystemChatMessage("You are a helpful assistant, who generates unit tests cases and unit test code from code snippet provided. Please generate a comprehensive unit tests for the given code snippet in the same language.");
                UserChatMessage userPrompt = new UserChatMessage(snippetInput.CodeSnippet);

                ChatCompletion chatCompletion = await client.CompleteChatAsync([systemMessage, userPrompt]);
                return new JsonResult(new { success = true, output = chatCompletion.ToString() });
            }
            catch (Exception ex)
            {
                return new JsonResult(new { success = false, output = $"Error generating from the given snippet. {ex.Message}" });
            }
        }

        [HttpPost("GenerateUnitTestFromFile")]
        public async Task<JsonResult> GenerateUnitTestFromFile(FileInput inputFile)
        {
            try
            {
                // Read file using StreamReader. Reads file line by line
                var prompt = new StringBuilder();
                using (var reader = new StreamReader(inputFile.uploadFile.OpenReadStream()))
                {
                    while (reader.Peek() >= 0)
                    {
                        prompt.AppendLine(reader.ReadLine());
                    }
                }

                ChatClient client = new(model: "gpt-3.5-turbo", Environment.GetEnvironmentVariable("OPENAI_API_KEY"));

                SystemChatMessage systemMessage = new SystemChatMessage("You are a helpful assistant, who generates unit tests cases and unit test code from code snippet provided. Please generate a comprehensive unit tests for the given code snippet in the same language.");
                UserChatMessage userPrompt = new UserChatMessage(prompt.ToString());

                ChatCompletion chatCompletion = await client.CompleteChatAsync([systemMessage, userPrompt]);
                return new JsonResult(new { success = true, output = chatCompletion.ToString() });
            }
            catch (Exception ex)
            {
                return new JsonResult(new { success = false, output = $"Error generating from the given file. {ex.Message}" });
            }
        }

    }
}
