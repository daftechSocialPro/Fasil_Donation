using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace FasilDonationAPI.Entities
{
    public class Member : Common
    {

  

        public virtual DesignSetting DesignSetting { get; set; }
        public Guid DesignSettingId { get; set; }


        public string Name { get; set; }       
        public string AmharicName { get; set; }
        public string UserPhoto { get; set; }
        public string PhoneNumber { get; set; }

        [NotMapped]
        [JsonIgnore] public IFormFile Photo { get; set; }
        public string Description { get; set; }
        public string BirthDate { get; set; }
        public bool IsActive { get; set; }
        public bool IdGiven { get; set; }
        public string InActiveDescription { get; set; }
        public Gender Gender { get; set; }
        public string IdNumber { get; set; }
        public string Address { get; set; }
        public string AddressAmharic { get; set; }
        public string JobType { get; set; }

     

        
    }
    public  enum Gender
    {
        Male,
        Female
    }
}
