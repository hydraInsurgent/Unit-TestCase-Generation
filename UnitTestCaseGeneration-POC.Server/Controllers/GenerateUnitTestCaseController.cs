using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
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
        public JsonResult GenerateUnitTestFromSnippet([FromBody] SnippetInput snippetInput)
        {
            try
            {
                ChatClient client = new(model: "gpt-3.5-turbo", Environment.GetEnvironmentVariable("OPENAI_API_KEY"));

                ChatCompletion chatCompletion = client.CompleteChat(
                    [new UserChatMessage("Say 'this is a test.'")]);
                return new JsonResult(new { success = true, output = chatCompletion.ToString() });
            }
            catch (Exception ex)
            {
                return new JsonResult(new { success = false, output = "Error generating from snippet." });
            }
        }

        [HttpPost("GenerateUnitTestFromFile")]
        public JsonResult GenerateUnitTestFromFile(FileInput inputFile)
        {
            try
            {
                // Read file using StreamReader. Reads file line by line
                var result = new StringBuilder();
                using (var reader = new StreamReader(inputFile.uploadFile.OpenReadStream()))
                {
                    while (reader.Peek() >= 0)
                    {
                        result.AppendLine(reader.ReadLine());
                    }
                }
                return new JsonResult(new { success = true, output = result.ToString() });
            }
            catch (Exception ex)
            {
                return new JsonResult(new { success = false, output = "Error generating from file." });
            }
        }

    }
}
