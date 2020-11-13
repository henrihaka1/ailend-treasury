using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace AILendTreasury.Data.Entities
{
    public class Balance
    {
        public int Id { get; set; }
        public DateTime SubmitedDate { get; set; }
        public JsonDocument CurrentBalance { get; set; }

        [JsonIgnore]
        public Position Position { get; set; }
    }
}
