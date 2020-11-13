using AILend.DAL.Repositories.Interfaces;
using AILendTreasury.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AILendTreasury.Data.Repositories.Interfaces
{
    public interface ICurrenciesRepository : IRepository<Currency>
    {
        public Task<List<Currency>> GetCurrencies();
    }
}
