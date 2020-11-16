using AILendTreasury.Data.Entities;
using AILendTreasury.Data.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;

namespace AILendTreasury.Data.Repositories.Implementations
{
    public class ManualRepository: Repository<Manual>, IManualRepository
    {
        private readonly ApplicationDbContext _context;

        public ManualRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<Manual>> GetAllTransactionsByFilter(string firstCurrency, string secondCurrency)
        {
            return _context.ManualsTransactions.Where(x =>
            (x.BoughtCurrency == firstCurrency && x.SoldCurrency == secondCurrency) ||
            (x.SoldCurrency == firstCurrency && x.BoughtCurrency == secondCurrency)).ToList();
        }
    }
}
