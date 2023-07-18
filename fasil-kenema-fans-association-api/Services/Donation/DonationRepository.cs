using FasilDonationAPI.Data;
using FasilDonationAPI.Helpers;

namespace FasilDonationAPI.Services.Donation
{
    public class DonationRepository : IDonationRepository
    {

        private readonly ApplicationDbContext _context;
        public DonationRepository(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task Create(FasilDonationAPI.Entities.Donation donation)
        {
            try
            {


                if (donation.Photo != null)
                {


                    var image = donation.Photo;
                    var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                    var fileExtension = photoinfo.Extension;
                    var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/Donation_Upload_photo/"), donation.ID.ToString() + fileExtension);
                    await image.SaveAsAsync(savingPath);
                    donation.Image = "Assets/Donation_Upload_photo/" + donation.ID + fileExtension;

                }



                await _context.Donations.AddAsync(donation);
                _context.SaveChanges();


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }


        public List<FasilDonationAPI.Entities.Donation> GetAll()
        {

            return _context.Donations.OrderByDescending(x => x.createdAt).ToList();
        }
          public FasilDonationAPI.Entities.Donation SingleDonation(Guid donationId)
        {

            return _context.Donations.Find(donationId);
        }


        public async Task Update(FasilDonationAPI.Entities.Donation donation)
        {
            try
            {

                var donation1 = _context.Donations.Find(donation.ID);

                donation1.Title = donation.Title;
                donation1.Target = donation.Target;
                donation1.Current = donation.Current;
                donation1.Description = donation.Description;
   



                if (donation.Photo != null)
                {
                    var image = donation.Photo;
                    var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                    var fileExtension = photoinfo.Extension;
                    var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/Donation_Upload_photo/"), donation1.ID.ToString() + fileExtension);

                    if (File.Exists(savingPath))
                    {
                        File.Delete(savingPath);
                    }

                    await image.SaveAsAsync(savingPath);
                    donation1.Image = "Assets/Donation_Upload_photo/" + donation1.ID + fileExtension;
                }


                _context.Donations.Update(donation1);
                _context.SaveChanges();


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }




        }


        public async Task Delete(Guid donationId)
        {
            try
            {
                var donation = await _context.Donations.FindAsync(donationId);
                _context.Donations.Remove(donation);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
