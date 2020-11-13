using AILendTreasury.Services.DTO;
using AILendTreasury.Services.Implementations;
using AILendTreasury.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AILendTreasury.Api.Controllers
{
    //api/currencies
    [Route("api/[controller]")]
    [ApiController]
    public class CurrenciesController : ControllerBase
    {
        private readonly ICurrenciesService _currenciesService;

        public CurrenciesController(ICurrenciesService currenciesService)
        {
            _currenciesService = currenciesService;
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetAllCurrencies()
        {
            Console.WriteLine("Hello");
            List<CurrenciesDTO> currenciesList = await _currenciesService.GetCurrencies();
            return Ok(currenciesList);
        }
    }
}
