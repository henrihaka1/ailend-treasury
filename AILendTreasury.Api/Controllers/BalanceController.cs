using AILendTreasury.Services.DTO;
using AILendTreasury.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AILendTreasury.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BalanceController : ControllerBase
    {

        private readonly IBalanceService _balanceService;
        public BalanceController(IBalanceService balanceService)
        {
            _balanceService = balanceService;
        }

        [HttpPost("update/current")]
        public async Task<IActionResult> UpdateBalance([FromBody] BalanceDTO balance)
        {
            return Ok(await _balanceService.UpdateBalance(balance));
        }

        //[HttpPost("get/latest")]
        //public async Task<IActionResult> GetLatestDailyBalance()

    }
}
