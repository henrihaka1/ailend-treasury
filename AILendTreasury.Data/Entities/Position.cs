using System;
using System.Collections.Generic;
using System.Text;

namespace AILendTreasury.Data.Entities
{
    public class Position
    {
        public int Id { get; set; }
        public DateTime SubmitedDate { get; set; }
        public List<Balance> Balances { get; set; }
        public List<Exchange> Exchanges { get; set; }
        public List<Automatic> AutomaticTransactions { get; set; }
        public List<Manual> ManualTransactions { get; set; }
        public List<FX> FXTransactions { get; set; }
        public List<Outside> OutsideTransactions { get; set; }

    }
}
