namespace FasilDonationAPI.Services.Partener
{
    public interface IPartenerRepository
    {
        Task Create(FasilDonationAPI.Entities.Partners partners);

        Task Update(FasilDonationAPI.Entities.Partners partners);

        List<FasilDonationAPI.Entities.Partners> GetAll();
        Task Delete(Guid partnerId);
    }
}
