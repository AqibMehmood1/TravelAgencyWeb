using Microsoft.AspNetCore.Identity.Data;
using TravelAgencyWeb.Models;
using TravelAgencyWeb.Request_Models;

namespace TravelAgencyWeb.Interfaces
{
    public interface IAuthService
    {
        User AddUser(User user);
        List<User> GetUsers();
        User GetUser(int id);
        User UpdateUser(User user);
        bool DeleteUser(int id);

        UserMasterVM Login(LogRequest loginRequest);
    }
}
