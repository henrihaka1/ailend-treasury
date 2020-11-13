using AILendTreasury.Services.DTO;
using AspNetCore.ServiceRegistration.Dynamic;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AILendTreasury.Services.Interfaces
{
    public interface ICurrenciesService : IScopedService
    {
        public Task<List<CurrenciesDTO>> GetCurrencies();
    }
}
