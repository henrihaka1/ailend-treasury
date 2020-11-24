using AILendTreasury.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AILendTreasury.Data.Repositories.Interfaces
{
    public interface IFxRepository : IRepository<FX>
    {
        public Task<List<FX>> GetAllTransactions(DateTime targetDate);
    }
}
