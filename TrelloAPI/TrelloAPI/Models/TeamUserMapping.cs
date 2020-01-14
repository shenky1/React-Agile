using TrelloAPI.Data;

namespace TrelloAPI.Models
{
    public class TeamUserMapping : IEntity
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public long TeamId { get; set; }
    }
}
