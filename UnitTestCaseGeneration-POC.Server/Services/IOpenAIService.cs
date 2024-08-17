using Microsoft.AspNetCore.Mvc;

namespace UnitTestCaseGeneration_POC.Server.Services
{
    public interface IOpenAIService
    {
        Task<JsonResult> GenerateUnitTestCases(string prompt);

    }
}
