namespace TrelloAPI.Controllers.Request
{
    public class TeamRequest
    {

        public long Id { get; set; }

        public string Name { get; set; }

        public long AuthorId { get; set; }

        public string Description { get; set; }
        public string Image { get; set; }
    }
}
