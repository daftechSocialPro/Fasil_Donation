using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace FasilDonationAPI.Entities
{
    public class NextMatch:Common
    {

        public string AwayLogo { get; set; }

        [NotMapped]

        [JsonIgnore] public IFormFile Photo { get; set; }

        public Boolean IsAway { get; set; } 
        public string SeasonName { get; set; }

        public string MatchName { get; set; }

        public string MatchDateTime { get; set; }

        public string LocationStadium { get; set; }

        public string OtherTeamName { get; set; }
    }
}
