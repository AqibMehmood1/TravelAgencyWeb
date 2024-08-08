using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using TravelAgencyWeb.Interfaces;
using TravelAgencyWeb.Models;
using TravelAgencyWeb.Request_Models;

namespace TravelAgencyWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        // POST api/<AuthController>
        [HttpPost("Login")]
        public UserMasterVM Login([FromBody] LogRequest loginModel)
        {
            var result = _authService.Login(loginModel);
            return result;
        }


    }
}
