using AILendTreasury.Data.Entities;
using AILendTreasury.Data.Repositories.Interfaces;

namespace AILendTreasury.Data.Repositories.Implementations
{
    public class BalanceRepository : Repository<Balance>, IBalanceRepository
    {
        private ApplicationDbContext _context;
        public BalanceRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

    }
}
