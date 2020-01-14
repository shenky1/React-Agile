using TrelloAPI.Models;

namespace TrelloAPI.Data.EFCore
{
    public class TeamUserMappingRepository : EfCoreRepository<TeamUserMapping, ApplicationDbContext>
    {
        public TeamUserMappingRepository(ApplicationDbContext context) : base(context)
        {

        }
    }
}
