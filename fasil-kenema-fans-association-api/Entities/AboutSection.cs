using System.ComponentModel.DataAnnotations.Schema;

namespace FasilDonationAPI.Entities
{
    public class AboutSection:Common
    {
        public string Title { get;set; }
        public string SubTitile { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }

        [NotMapped]
        public IFormFile Photo { get; set; }
    }
}
