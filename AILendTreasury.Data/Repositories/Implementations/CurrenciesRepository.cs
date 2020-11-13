using AILendTreasury.Data.Entities;
using AILendTreasury.Data.Repositories.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace AILendTreasury.Data.Repositories.Implementations
{
    public class CurrenciesRepository :  Repository<Currency>, ICurrenciesRepository
    {
        private ApplicationDbContext _context;
        public CurrenciesRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<Currency>> GetCurrencies()
        {
            List<Currency> list = await _context.Currencies.ToListAsync();
            return list;
        }
    }
}
