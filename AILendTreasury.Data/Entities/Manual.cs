using System;
using System.Collections.Generic;
using System.Text;

namespace AILendTreasury.Data.Entities
{
    public class Manual: Transaction
    {
        public int Id { get; set; }
        public string Customer { get; set; }
        public Staff ApprovedBy { get; set; }
    }
}
