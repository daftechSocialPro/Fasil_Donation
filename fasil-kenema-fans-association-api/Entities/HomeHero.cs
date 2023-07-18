using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace FasilDonationAPI.Entities
{
    public class HomeHero :Common
    {
        public string BackgroundImage { get; set; }       

        [NotMapped]
        [JsonIgnore] public IFormFile Photo { get; set; }
        public string Content1 { get; set; }
        public string Content2 { get; set; }
        public string Content3 { get; set; }
        public string Content4 { get; set; }

        public int position { get; set; }
    }
}
