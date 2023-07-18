using FasilDonationAPI.Data;
using FasilDonationAPI.Entities;
using FasilDonationAPI.Helpers;

namespace FasilDonationAPI.Services.HomeHero
{
    public class HomeHeroRepository : IHomeHeroRepository
    {

        private readonly ApplicationDbContext _context;
        public HomeHeroRepository(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task Create(FasilDonationAPI.Entities.HomeHero homeHero)
        {
            try
            {


                if (homeHero.Photo != null)
                {


                    var image = homeHero.Photo;
                    var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                    var fileExtension = photoinfo.Extension;
                    var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/Home_hero_upload/"), homeHero.ID.ToString() + fileExtension);
                    await image.SaveAsAsync(savingPath);
                    homeHero.BackgroundImage = "Assets/Home_hero_upload/" + homeHero.ID + fileExtension;

                }



                await _context.HomeHeroes.AddAsync(homeHero);
                _context.SaveChanges();


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }


        public List<FasilDonationAPI.Entities.HomeHero> GetAll()
        {

            return _context.HomeHeroes.OrderBy(x=>x.position).ToList();
        }

        public async Task Update(FasilDonationAPI.Entities.HomeHero homeHero)
        {
            try
            {

                var homeHero1 = _context.HomeHeroes.Find(homeHero.ID);

                homeHero1.Content1 = homeHero.Content1;
                homeHero1.Content2 = homeHero.Content2;
                homeHero1.Content3 = homeHero.Content3;
                homeHero1.Content4 = homeHero.Content4;
                homeHero1.position = homeHero.position;



                if (homeHero.Photo != null)
                {
                    var image = homeHero.Photo;
                    var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                    var fileExtension = photoinfo.Extension;
                    var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/Home_hero_upload/"), homeHero1.ID.ToString() + fileExtension);

                    if (File.Exists(savingPath))
                    {
                        File.Delete(savingPath);
                    }

                    await image.SaveAsAsync(savingPath);
                    homeHero1.BackgroundImage = "Assets/Home_hero_upload/" + homeHero1.ID + fileExtension;
                }


                _context.HomeHeroes.Update(homeHero1);
                _context.SaveChanges();


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }




        }


        public async Task Delete(Guid homeHeroId)
        {
            try
            {
                var homeHero = await _context.HomeHeroes.FindAsync(homeHeroId);
                _context.HomeHeroes.Remove(homeHero);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}

