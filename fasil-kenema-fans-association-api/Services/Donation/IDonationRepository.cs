namespace FasilDonationAPI.Services.Donation
{
    public interface IDonationRepository
    {
        Task Create(FasilDonationAPI.Entities.Donation donation);

        Task Update(FasilDonationAPI.Entities.Donation donation);
        FasilDonationAPI.Entities.Donation SingleDonation(Guid donationId);
        List<FasilDonationAPI.Entities.Donation> GetAll();
        Task Delete(Guid donationId);
    }
}
