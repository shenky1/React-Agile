namespace TrelloAPI.Controllers.Request
{
    public class ListResponse
    {

        public long Id { get; set; }

        public string Name { get; set; }

        public long OrderId { get; set; }
        public long BoardId { get; set; }

        public long NumberOfCards { get; set; }


    }
}
