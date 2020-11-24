using AILendTreasury.Data.Entities;
using AILendTreasury.Data.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;

namespace AILendTreasury.Data.Repositories.Implementations
{
    public class FxRepository : Repository<FX>, IFxRepository
    {
        private readonly ApplicationDbContext _context;

        public FxRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<FX>> GetAllTransactions(DateTime targetDate)
        {
            return _context.FXTransactions.Where(x =>
            x.CreatedDate.Year == targetDate.Year && x.CreatedDate.Month == targetDate.Month && x.CreatedDate.Day == targetDate.Day).ToList();
        }
    }
}
