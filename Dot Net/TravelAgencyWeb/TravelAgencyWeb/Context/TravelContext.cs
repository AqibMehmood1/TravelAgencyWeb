using Microsoft.EntityFrameworkCore;
using TravelAgencyWeb.Models;

namespace TravelAgencyWeb.Context
{
    public class TravelContext:DbContext
    {
        public TravelContext(DbContextOptions<TravelContext> options) : base(options)
        {
            
        }
        public DbSet<User> User { get; set; }

    }
}
