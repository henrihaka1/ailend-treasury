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
    }
}
