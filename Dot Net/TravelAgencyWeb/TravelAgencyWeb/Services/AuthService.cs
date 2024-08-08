using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TravelAgencyWeb.Context;
using TravelAgencyWeb.Interfaces;
using TravelAgencyWeb.Models;
using TravelAgencyWeb.Request_Models;

namespace TravelAgencyWeb.Services
{
    public class AuthService : IAuthService
    {
        private readonly TravelContext _jwtService;
        private readonly IConfiguration _configuration;
        public AuthService(TravelContext jwtContext, IConfiguration configuration)
        {
            _jwtService = jwtContext;
            _configuration = configuration;
        }

        public User AddUser(User user)
        {
            var addedUser = _jwtService.Add(user);
            _jwtService.SaveChanges();
            return addedUser.Entity;

        }
        public List<User> GetUsers()
        {
            var addedUser = _jwtService.User.ToList();
            _jwtService.SaveChanges();
            return addedUser;
        }
        public User GetUser(int id)
        {
            var addedUser = _jwtService.User.FirstOrDefault(x => x.Id == id);
            _jwtService.SaveChanges();
            return addedUser;
        }
        public User UpdateUser(User user)
        {
            var updated = _jwtService.User.Update(user);
            _jwtService.SaveChanges();
            return updated.Entity;
        }
        public bool DeleteUser(int id)
        {
            try
            {
                var usr = _jwtService.User.SingleOrDefault(s => s.Id == id);
                if (usr == null)
                    throw new Exception("user not found");
                else
                {
                    _jwtService.User.Remove(usr);
                    _jwtService.SaveChanges();
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }



        public UserMasterVM Login(LogRequest loginRequest)
        {
            if (loginRequest.Username != null && loginRequest.Password != null)
            {
                var user = _jwtService.User.SingleOrDefault(s => s.Email == loginRequest.Username && s.Password == loginRequest.Password);
                if (user != null)
                {
                    var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim("Id", user.Id.ToString()),
                        new Claim("UserName", user.Name),
                        new Claim("Email", user.Email),
                        new Claim("Role", user.Role)
                    };
                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["Jwt:Issuer"],
                        _configuration["Jwt:Audience"],
                        claims,
                        expires: DateTime.UtcNow.AddMinutes(10),
                        signingCredentials: signIn);

                    var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);

                    UserMasterVM userMaster = new UserMasterVM();
                    userMaster.Id = user.Id;
                    userMaster.Name = user.Name;
                    userMaster.UserName = user.Email;
                    userMaster.Password = user.Password;
                    userMaster.RoleDetails = user.Role;
                    userMaster.Token = jwtToken;
                    return userMaster;
                }
                else
                {
                    throw new Exception("user is not valid");
                }
            }
            else
            {
                throw new Exception("credentials are not valid");
            }
        }
    }
}

