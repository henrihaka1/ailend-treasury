
using AILendTreasury.Data.Entities;
using System.Threading.Tasks;

namespace AILendTreasury.Data.Repositories.Interfaces
{
    public interface IBalanceRepository : IRepository<Balance>
    {
        public Task<Balance> GetStartingBalanceByPositionId(long id);
    }
}
