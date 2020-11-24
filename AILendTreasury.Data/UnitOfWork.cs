using AILendTreasury.Data.Repositories.Implementations;
using AILendTreasury.Data.Repositories.Interfaces;

namespace AILendTreasury.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        readonly ApplicationDbContext _context;
        ICurrenciesRepository _currencies;
        IBalanceRepository _balances;
        IPositionRepository _positions;
        IStaffRepository _staffMembers;
        IAutomaticRepository _automaticTransactions;
        IManualRepository _manualTransactions;
        IFxRepository _fxTransactions;

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
        }

        public IFxRepository FxTransactions
        {
            get
            {
                if (_fxTransactions == null)
                    _fxTransactions = new FxRepository(_context);
                
                return _fxTransactions;
            }
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

        public IBalanceRepository Balances
        {
            get
            {
                if (_balances == null)
                    _balances = new BalanceRepository(_context);
                return _balances;
            }
        }

        public IPositionRepository Positions
        {
            get
            {
                if (_positions == null)
                    _positions = new PositionRepository(_context);
                return _positions;
            }
        }

        public IStaffRepository StaffMembers
        {
            get
            {
                if (_staffMembers == null)
                    _staffMembers = new StaffRepository(_context);
                return _staffMembers;
            }
        }

        public IAutomaticRepository AutomaticTransactions
        {
            get
            {
                if (_automaticTransactions == null)
                    _automaticTransactions = new AutomaticRepository(_context);
                return _automaticTransactions;
            }
        }
        public IManualRepository ManualTransactions
        {
            get
            {
                if (_manualTransactions == null)
                    _manualTransactions = new ManualRepository(_context);
                return _manualTransactions;
            }
        }

        public int SaveChanges()
        {

            return _context.SaveChanges();
        }
    }
}
