using AILendTreasury.Data.Repositories.Implementations;
using AILendTreasury.Data.Repositories.Interfaces;

namespace AILendTreasury.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        readonly ApplicationDbContext _context;
        ICurrenciesRepository _currencies;

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
        }

        public ICurrenciesRepository Currencies
        {
            get
            {
                if (_currencies == null)
                    _currencies = new CurrenciesRepository(_context);

                return _currencies;
            }
        }

        public int SaveChanges()
        {

            return _context.SaveChanges();
        }
    }
}
