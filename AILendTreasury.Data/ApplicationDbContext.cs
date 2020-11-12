using AILendTreasury.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace AILendTreasury.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Automatic> AutomaticTransactions { get; set; }
        public DbSet<Balance> Balances { get; set; }
        public DbSet<Currency> Currencies { get; set; }
        public DbSet<Exchange> ExchangeRates { get; set; }
        public DbSet<FX> FXTransactions { get; set; }
        public DbSet<Manual> ManualsTransactions { get; set; }
        public DbSet<Outside> OutsideTransacitons { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<Rate> Rates { get; set; }
        public DbSet<Staff> StaffMembers { get; set; }


        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

    }
}
