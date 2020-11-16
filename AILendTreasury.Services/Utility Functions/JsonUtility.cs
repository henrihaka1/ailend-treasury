using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;

namespace AILendTreasury.Services.Utility_Functions
{
    public static class JsonUtil
    {
        public static double GetValueAsDouble(JsonElement json, string key)
        {
            try
            {
                return json.GetProperty(key).GetDouble();

            }
            catch (KeyNotFoundException)
            {
                return 0;
            }
        }

        public static string GetValueAsString(JsonElement json, string key)
        {
            try
            {
                return json.GetProperty(key).GetString();

            }
            catch (KeyNotFoundException)
            {
                return string.Empty;
            }
        }

        public static int GetValueAsInt(JsonElement json, string key)
        {
            try
            {
                return json.GetProperty(key).GetInt32();

            }
            catch (KeyNotFoundException)
            {
                return 0;
            }
        }
    }
}
