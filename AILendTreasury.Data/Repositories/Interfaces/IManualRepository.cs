using AILendTreasury.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AILendTreasury.Data.Repositories.Interfaces
{
    public interface IManualRepository : IRepository<Manual>
    {
        public Task<List<Manual>> GetAllTransactionsByFilter(string firstCurrency, string secondCurrency);
    }
}
