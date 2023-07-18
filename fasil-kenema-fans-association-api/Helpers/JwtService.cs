using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace FasilDonationAPI.Helpers
{


    public class JwtService
    {


        public string secureKey = "aJ2MENnqLqlzogNz7chKmJB27w1zbYRK";

        public string Generate(Guid id)

        {

            var symtericSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secureKey));
            var crdentials = new SigningCredentials(symtericSecurityKey, SecurityAlgorithms.HmacSha256Signature);
            var header = new JwtHeader(crdentials);


            var payload = new JwtPayload(
                id.ToString(), null, null, null, DateTime.Today.AddDays(1)
            );



            var securityToken = new JwtSecurityToken(
                header, payload
            );


            return new JwtSecurityTokenHandler().WriteToken(securityToken);

        }

        public JwtSecurityToken verify(string jwt)
        {


            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secureKey);
            tokenHandler.ValidateToken(jwt, new TokenValidationParameters
            {

                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuerSigningKey= true,
                ValidateIssuer=false,
                ValidateAudience=false



            }, out SecurityToken validatedToken);

            return (JwtSecurityToken) validatedToken;
        }
    }
}