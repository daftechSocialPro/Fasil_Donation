namespace FasilDonationAPI.Services.Branch
{
    public interface IBranchRepository
    {
        Task Create(FasilDonationAPI.Entities.Branch branch);

        Task Update(FasilDonationAPI.Entities.Branch branch);

        List<FasilDonationAPI.Entities.Branch> GetAll();
        Task Delete(Guid branchID);
    }
}
