using FasilDonationAPI.Data;
using FasilDonationAPI.Helpers;

namespace FasilDonationAPI.Services.Branch
{
    public class BranchRepository:IBranchRepository
    {

        private readonly ApplicationDbContext _context;
        public BranchRepository(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task Create(FasilDonationAPI.Entities.Branch branch)
        {
            try
            {                  
                await _context.Branches.AddAsync(branch);
                _context.SaveChanges();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }


        public List<FasilDonationAPI.Entities.Branch> GetAll()
        {

            return _context.Branches.OrderByDescending(x => x.createdAt).ToList();
        }

        public async Task Update(FasilDonationAPI.Entities.Branch branch)
        {
            try
            {

                var branch1 = _context.Branches.Find(branch.ID);

                branch1.LocalName = branch.LocalName;
                branch1.Name = branch.Name;
              
                _context.Branches.Update(branch1);
                _context.SaveChanges();


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }




        }


        public async Task Delete(Guid branchId)
        {
            try
            {
                var branch = await _context.Branches.FindAsync(branchId);
                _context.Branches.Remove(branch);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
