namespace TrelloAPI.Controllers.Request
{
    public class BoardRequest
    {

        public long Id { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public string Description { get; set; }

        public long TeamId { get; set; }
    }
}
