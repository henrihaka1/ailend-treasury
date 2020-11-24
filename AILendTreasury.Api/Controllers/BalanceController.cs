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
            try
            {
                BalanceDTO updatedBalance = await _balanceService.UpdateBalance(balance);
                return Ok(updatedBalance);
            }
            catch
            {
                return BadRequest("Something went wrong");
            }
        }

        [HttpGet("get/starting")]
        public async Task<IActionResult> GetStartingPosition()
        {
            try
            {
                DateTime today = DateTime.Now;
                BalanceDTO startingBalance = await _balanceService.GetStartingBalance(today);
                return Ok(startingBalance);
            }
            catch
            {
                return BadRequest("The data has not been imported correctly from Midas");
            }
        }

        [HttpGet("get/current")]
        public async Task<IActionResult> GetCurrentPosition()
        {
            try
            {
                DateTime today = DateTime.Now;
                BalanceDTO startingBalance = await _balanceService.GetLatestBalance(today);
                return Ok(startingBalance);
            }
            catch
            {
                return BadRequest("The data has not been imported correctly from the database");
            }
        }

        [HttpGet("get/balances")]
        public async Task<IActionResult> GetBalances()
        {
            try
            {
                List<BalanceDTO> balances = await _balanceService.GetBalances();
                return Ok(balances);
            }
            catch
            {
                return BadRequest("Something went wrong");
            }
        }

        [HttpGet("get/today")]
        public async Task<IActionResult> GetTodayBalances()
        {
            try
            {
                List<BalanceDTO> balances = await _balanceService.GetTodayBalances();
                return Ok(balances);
            }
            catch
            {
                return BadRequest("Something went wrong");
            }
        }

    }
}
