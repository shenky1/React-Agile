using TrelloAPI.Data;

namespace TrelloAPI.Models
{
    public class Board : IEntity
    {
        public long Id { get; set; }
        public long TeamId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
    }
}
