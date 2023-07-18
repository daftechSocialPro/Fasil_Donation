using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace FasilDonationAPI.Entities
{
    public class DesignSetting : Common
    {

        public Guid IDtemplateId { get; set; }

        public string Name { get; set; }

        public string AmharicName { get; set; }

        public float Payment { get; set; }

        public bool HasPenality { get; set; }

        public float PenalityAmount { get; set; }

        public int IncreasesEvery { get; set; }

        public float MultiplyAmount { get; set; }

        public string Description { get; set; }

        public string Color { get; set; }

        public string IdInitial { get; set; }

        public string StartFrom { get; set; }



        public string IdImage { get; set; }

        [NotMapped]
        [JsonIgnore]
        public IFormFile Photo { get; set; }

        public string InnerImage { get; set; }

        [NotMapped]
        [JsonIgnore]
        public IFormFile Photo2 { get; set; }

 
    }
}
