using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using OpenAI;
using OpenAI.Chat;
using System.Text;
using UnitTestCaseGeneration_POC.Server.Models;
using UnitTestCaseGeneration_POC.Server.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UnitTestCaseGeneration_POC.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenerateUnitTestCaseController : ControllerBase
    {
        private readonly IOpenAIService _openAIService;

        public GenerateUnitTestCaseController(IOpenAIService openAIService)
        {
            _openAIService = openAIService;
        }

        [EnableCors("AllowOrigin")]
        [HttpPost("GenerateUnitTestFromSnippet")]
        public async Task<JsonResult> GenerateUnitTestFromSnippet([FromBody] SnippetInput snippetInput)
        {
            try
            {
                if (snippetInput?.CodeSnippet != null && !string.IsNullOrEmpty(snippetInput?.CodeSnippet))
                {
                    return await _openAIService.GenerateUnitTestCases(snippetInput.CodeSnippet);
                }
                else
                {
                    return new JsonResult(new { success = false, output = $"Code snippet is Empty. Please check the input." });
                }
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

                if (!string.IsNullOrEmpty(prompt?.ToString()))
                {
                    return await _openAIService.GenerateUnitTestCases(prompt.ToString());
                }
                else
                {
                    return new JsonResult(new { success = false, output = $"File supplied is Empty. Please check the input." });
                }
            }
            catch (Exception ex)
            {
                return new JsonResult(new { success = false, output = $"Error generating from the given file. {ex.Message}" });
            }
        }

    }
}
