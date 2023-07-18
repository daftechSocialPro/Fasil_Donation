using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace FasilDonationAPI.Entities
{
    public class Donation:Common
    {

        public string Title { get; set; }


        public string Image { get; set; }


        [NotMapped]
        [JsonIgnore]
        public IFormFile Photo { get; set; }

        public string Description { get; set; }

        public float Target { get; set; }

        public float Current { get; set; }

    }
}
