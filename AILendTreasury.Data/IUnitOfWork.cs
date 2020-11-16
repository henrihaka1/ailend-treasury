using AILendTreasury.Data.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace AILendTreasury.Data
{
    public interface IUnitOfWork
    {
        ICurrenciesRepository Currencies { get;}
        IBalanceRepository Balances { get; }
        IPositionRepository Positions { get; }
        IStaffRepository StaffMembers { get; }
        IAutomaticRepository AutomaticTransactions { get; }
        IManualRepository ManualTransactions { get; }
        int SaveChanges();
    }
}
