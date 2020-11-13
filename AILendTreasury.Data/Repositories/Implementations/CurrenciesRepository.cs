using AILend.DAL.Repositories;
using AILend.DAL.Repositories.Interfaces;
using AILendTreasury.Data.Entities;
using AILendTreasury.Data.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
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
