using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrelloAPI.Controllers.Response
{
    public class CardResponse
    {
        public long Id { get; set; }

        public string Title { get; set; }

        public long ListId { get; set; }

        public long AssigneId { get; set; }

        public DateTime DueDate { get; set; }
    }
}
