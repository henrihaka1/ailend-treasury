using System;
using System.Collections.Generic;
using System.Text;

namespace AILendTreasury.Data.Entities
{
    public class FX : Transaction
    {
        public int Id { get; set; }
        public string Bank { get; set; }
        public Staff ApprovedBy { get; set; }
    }
}
