using TrelloAPI.Data;

namespace TrelloAPI.Models
{
    public class Team : IEntity
    {
        public long Id { get; set; }
        public long AuthorId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
    }
}
