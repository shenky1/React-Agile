using System;
using TrelloAPI.Data;

namespace TrelloAPI.Models
{
    public class Comment : IEntity
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public long CardId { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; }
    }
}
