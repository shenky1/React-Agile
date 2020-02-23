namespace TrelloAPI.Controllers.Request
{
    public class TeamUserMappingRequest
    {

        public long Id { get; set; }

        public long TeamId { get; set; }
        public long UserId { get; set; }
    }
}
