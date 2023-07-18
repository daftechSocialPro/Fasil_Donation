using System.ComponentModel.DataAnnotations.Schema;

namespace FasilDonationAPI.Entities
{
    public class Partners:Common
    {
        public string Image { get; set; }

        public string Name { get; set; }

        [NotMapped]
        public IFormFile Photo { get; set; }
    }
}
