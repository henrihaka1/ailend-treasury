
using AILendTreasury.Data.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AILendTreasury.Data.Repositories.Interfaces
{
    public interface IBalanceRepository : IRepository<Balance>
    {
        public Task<Balance> GetStartingBalanceByPositionId(long id);
        public Task<Balance> GetLatestBalanceByPositionId(long id);
        public Task<List<Balance>> GetBalances(long id);
    }
}
