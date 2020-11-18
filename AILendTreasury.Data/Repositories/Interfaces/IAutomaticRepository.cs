using AILendTreasury.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AILendTreasury.Data.Repositories.Interfaces
{
    public interface IAutomaticRepository: IRepository<Automatic>
    {
        public Task<List<Automatic>> GetAllTransactions(DateTime targetDate);
        public Task<List<Automatic>> GetAllTransactionsByFilter(string firstCurrency, string secondCurrency);
    }
}
