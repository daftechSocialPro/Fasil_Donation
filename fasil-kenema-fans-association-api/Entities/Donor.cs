namespace FasilDonationAPI.Entities
{
    public class Donor:Common
    {
        public string FullName { get; set; }

        public float Amount { get; set; }

        public Guid DonationId { get; set; }

        public Donation Donation { get; set; }
    }
}
