namespace TravelAgencyWeb.Request_Models
{
    public class UserMasterVM
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
        public object RoleDetails { get; set; }
    }
}
