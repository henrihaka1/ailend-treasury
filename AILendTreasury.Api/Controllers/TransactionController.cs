using AILendTreasury.Services.DTO;
using AILendTreasury.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AILendTreasury.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ISalesTransactionService _salesTransactionService;

        public TransactionController(ISalesTransactionService salesTransactionService)
        {
            _salesTransactionService = salesTransactionService;
        }

        [HttpPost("new")]
        public async Task<IActionResult> SubmitSalesTransaction([FromBody] SalesTransactionDTO newTransaction)
        {
            try
            {
                BalanceDTO updatedBalance = await _salesTransactionService.InsertSalesTransaction(newTransaction);
                return Ok(updatedBalance);
            }
            catch
            {
                return BadRequest("Sale was not submited successfully");
            }
        }

        [HttpGet("sales/get/{curr1}/{curr2}")]
        public async Task<IActionResult> GetTransactionsByFilter(string curr1, string curr2)
        {
            return Ok(await _salesTransactionService.GetSalesTransactionsByFilter(curr1, curr2));
        }
    }
}
