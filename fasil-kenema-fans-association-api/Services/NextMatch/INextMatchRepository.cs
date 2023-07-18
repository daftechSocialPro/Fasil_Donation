namespace FasilDonationAPI.Services.NextMatch
{
    public interface INextMatchRepository
    {
        Task Create(FasilDonationAPI.Entities.NextMatch NextMatch);

        Task Update(FasilDonationAPI.Entities.NextMatch NextMatch);

        List<FasilDonationAPI.Entities.NextMatch> GetAll();
        Task Delete(Guid NextMatchId);
    }
}
