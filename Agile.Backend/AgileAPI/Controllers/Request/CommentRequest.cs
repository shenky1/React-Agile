using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrelloAPI.Controllers.Request
{
    public class CommentRequest
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public long CardId { get; set; }
        public string Content { get; set; }
        public DateTime DateCreated { get; set; }

    }
}
