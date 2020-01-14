using System;
using TrelloAPI.Data;

namespace TrelloAPI.Models
{
    public class Card : IEntity
    {
        public long Id { get; set; }
        public long AssigneId { get; set; }
        public long ListId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
    }
}
