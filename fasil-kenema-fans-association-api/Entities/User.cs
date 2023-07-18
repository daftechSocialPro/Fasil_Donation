using System.ComponentModel;
using System.Text.Json.Serialization;

namespace FasilDonationAPI.Entities
{


    public class User :Common
    {
         

    
        public string fullName { get; set; }

        public string email { get; set; }

        [DefaultValue(true)]
        public bool isActive { get; set; }

     

        [JsonIgnore] public string password { get; set; }



    }

  
}