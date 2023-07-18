
using System.ComponentModel.DataAnnotations.Schema;

namespace FasilDonationAPI.Entities
{

    [NotMapped]
    public class FileResponse
    {
        public byte[] File { get; set; }
        public string Type { get; set; }
        public string FileName { get; set; }
    }
}
