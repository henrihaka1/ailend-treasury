using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;

namespace AILendTreasury.Data.Entities
{
    public class Balance
    {
        public int Id { get; set; }
        public DateTime SubmitedDate { get; set; }
        public JsonDocument CurrentBalance { get; set; }
    }
}
