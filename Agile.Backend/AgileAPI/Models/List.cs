using TrelloAPI.Data;

namespace TrelloAPI.Models
{
    public class List : IEntity
    {
        public long Id { get; set; }
        public long BoardId { get; set; }
        public string Name { get; set; }
        public long OrderId { get; set; }
    }
}
