using AILendTreasury.Data.Entities;
using AILendTreasury.Data.Repositories.Interfaces;
using System.Threading.Tasks;
using System.Linq;
using System;
using System.Collections.Generic;

namespace AILendTreasury.Data.Repositories.Implementations
{
    public class BalanceRepository : Repository<Balance>, IBalanceRepository
    {
        private ApplicationDbContext _context;
        public BalanceRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<Balance>> GetBalances(long id)
        {
            return _context.Balances.Where(x => x.Position.Id == id).ToList();
        }

        public async Task<Balance> GetLatestBalanceByPositionId(long id)
        {
            return _context.Balances.Where(x => x.Position.Id == id).OrderByDescending(x => x.Id).FirstOrDefault();
        }

        public async Task<Balance> GetStartingBalanceByPositionId(long id)
        {
            return _context.Balances.Where(x=>x.Position.Id ==id).OrderBy(x=>x.Id).FirstOrDefault();
        }
    }
}
