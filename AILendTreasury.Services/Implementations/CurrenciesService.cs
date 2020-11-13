using AILendTreasury.Data;
using AILendTreasury.Data.Entities;
using AILendTreasury.Services.DTO;
using AILendTreasury.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AILendTreasury.Services.Implementations
{
    public class CurrenciesService : ICurrenciesService
    {
        private readonly IUnitOfWork _unitOfWork;
        public CurrenciesService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<List<CurrenciesDTO>> GetCurrencies()
        {
            List<Currency> list = await _unitOfWork.Currencies.GetCurrencies();
            List<CurrenciesDTO> currencies = new List<CurrenciesDTO>();
            foreach(var item in list)
            {
                CurrenciesDTO element = new CurrenciesDTO()
                {
                    Index = item.Id,
                    Label = item.Label
                };
                currencies.Add(element); 
            }
            return currencies;
        }
    }
}
