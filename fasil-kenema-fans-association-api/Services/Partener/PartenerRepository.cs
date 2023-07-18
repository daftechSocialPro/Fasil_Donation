using FasilDonationAPI.Data;
using FasilDonationAPI.Helpers;

namespace FasilDonationAPI.Services.Partener
{
    public class PartenerRepository : IPartenerRepository
    {
        private readonly ApplicationDbContext _context;
        public PartenerRepository(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task Create(FasilDonationAPI.Entities.Partners Partners)
        {
            try
            {


                if (Partners.Photo != null)
                {


                    var image = Partners.Photo;
                    var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                    var fileExtension = photoinfo.Extension;
                    var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/Home_hero_upload/"), Partners.ID.ToString() + fileExtension);
                    await image.SaveAsAsync(savingPath);
                    Partners.Image = "Assets/Home_hero_upload/" + Partners.ID + fileExtension;

                }



                await _context.Partners.AddAsync(Partners);
                _context.SaveChanges();


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }


        public List<FasilDonationAPI.Entities.Partners> GetAll()
        {

            return _context.Partners.OrderByDescending(x => x.createdAt).ToList();
        }

        public async Task Update(FasilDonationAPI.Entities.Partners Partners)
        {
            try
            {

                var Partners1 = _context.Partners.Find(Partners.ID);

                Partners1.Name = Partners.Name;
               



                if (Partners.Photo != null)
                {
                    var image = Partners.Photo;
                    var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                    var fileExtension = photoinfo.Extension;
                    var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/Home_hero_upload/"), Partners1.ID.ToString() + fileExtension);

                    if (File.Exists(savingPath))
                    {
                        File.Delete(savingPath);
                    }

                    await image.SaveAsAsync(savingPath);
                    Partners1.Image = "Assets/Home_hero_upload/" + Partners1.ID + fileExtension;
                }


                _context.Partners.Update(Partners1);
                _context.SaveChanges();


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }




        }


        public async Task Delete(Guid PartnersId)
        {
            try
            {
                var Partners = await _context.Partners.FindAsync(PartnersId);
                _context.Partners.Remove(Partners);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}

