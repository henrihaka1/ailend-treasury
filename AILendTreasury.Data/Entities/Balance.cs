using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;

namespace AILendTreasury.Data.Entities
{
    public class Balance
    {
        public DateTime SubmitedDate { get; set; }
        public JsonDocument CurrentBalance { get; set; }
    }
}
