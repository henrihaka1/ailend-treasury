using System;
using System.Collections.Generic;
using System.Text;

namespace AILendTreasury.Data.Entities
{
    public class Exchange
    {
        public int Id { get; set; }
        public DateTime SubmitedDate { get; set; }
        public List<Rate> Rates { get; set; }
    }
}
