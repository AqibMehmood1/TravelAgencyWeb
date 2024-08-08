using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TravelAgencyWeb.Interfaces;
using TravelAgencyWeb.Models;

namespace TravelAgencyWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class RegisterUserController : ControllerBase
    {
        private readonly IAuthService _authService;
        public RegisterUserController(IAuthService authService)
        {
            _authService = authService;
        }

        // PUT api/<AuthController>/5
        [HttpPost("addUser")]
        public User AddUser([FromBody] User value)
        {
            var user = _authService.AddUser(value);
            return user;
        }

        [HttpGet]
        public List<User> GetUsers()
        {
            var users = _authService.GetUsers();
            return users;
        }

        [HttpGet("{id}")]
        public User GetUser(int id)
        {
            var user = _authService.GetUser(id);
            return user;
        }

        [HttpPut]
        public User UpdateUser([FromBody] User value)
        {
            var user = _authService.UpdateUser(value);
            return user;
        }

        [HttpDelete]
        public bool DeleteUser(int id)
        {
            var IsDeleted = _authService.DeleteUser(id);
            return IsDeleted;
        }
    }
}
