using AILendTreasury.Data.Entities;
using AILendTreasury.Data.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;

namespace AILendTreasury.Data.Repositories.Implementations
{
    public class AutomaticRepository: Repository<Automatic>, IAutomaticRepository
    {
        private readonly ApplicationDbContext _context;
        public AutomaticRepository(ApplicationDbContext context) :base(context)
        {
            _context = context;
        }

        public async Task<List<Automatic>> GetAllTransactions(DateTime targetDate)
        {
            return _context.AutomaticTransactions.Where(x =>
            x.CreatedDate.Year == targetDate.Year && x.CreatedDate.Month == targetDate.Month && x.CreatedDate.Day == targetDate.Day).ToList();
        }

        public async Task<List<Automatic>> GetAllTransactionsByFilter(string firstCurrency, string secondCurrency)
        {
            return _context.AutomaticTransactions.Where(x => 
            (x.BoughtCurrency == firstCurrency && x.SoldCurrency == secondCurrency) ||
            (x.SoldCurrency == firstCurrency && x.BoughtCurrency == secondCurrency)).ToList();
        }
    }
}
