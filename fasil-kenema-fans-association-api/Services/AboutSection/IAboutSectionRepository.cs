namespace FasilDonationAPI.Services.AboutSection
{
    public interface IAboutSectionRepository
    {
        Task Create(FasilDonationAPI.Entities.AboutSection aboutSection);

        Task Update(FasilDonationAPI.Entities.AboutSection aboutSection);

        List<FasilDonationAPI.Entities.AboutSection> GetAll();
        Task Delete(Guid aboutSectionId);
    }
}
