using TrelloAPI.Models;

namespace TrelloAPI.Data.EFCore
{
    public class CommentRepository : EfCoreRepository<Comment, ApplicationDbContext>
    {
        public CommentRepository(ApplicationDbContext context) : base(context)
        {

        }
    }
}
