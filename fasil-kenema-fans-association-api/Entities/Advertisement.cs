using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace FasilDonationAPI.Entities
{



    public class Advertisement : Common{


        public virtual DesignSetting Designsetting { get; set; }
        public Guid DesignsettingId { get; set; }
        public string Name { get; set; }
      
        public string Description {get;set;}

        public string AdPhoto { get; set; }

        [NotMapped]
        [JsonIgnore] public IFormFile Photo { get; set; }


        public string logo { get; set; }
        [NotMapped]
        [JsonIgnore] public IFormFile Photo2 { get; set; }

        public DateTime FromDate {get; set;}

        public DateTime ToDate {get; set;}

        public postition Postition { get; set; }
               

    }

    public enum postition
    {
        Left,
        Right,
        Top,    
        Bottom
    }
}