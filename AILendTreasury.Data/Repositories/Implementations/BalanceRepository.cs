using AILendTreasury.Data.Entities;
using AILendTreasury.Data.Repositories.Interfaces;
using System.Threading.Tasks;
using System.Linq;

namespace AILendTreasury.Data.Repositories.Implementations
{
    public class BalanceRepository : Repository<Balance>, IBalanceRepository
    {
        private ApplicationDbContext _context;
        public BalanceRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Balance> GetStartingBalanceByPositionId(long id)
        {
            return _context.Balances.Where(x=>x.Position.Id ==id).OrderBy(x=>x.Position.Id).FirstOrDefault();
        }
    }
}
