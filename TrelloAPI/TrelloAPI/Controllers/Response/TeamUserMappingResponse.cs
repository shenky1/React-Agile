using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrelloAPI.Controllers.Response
{
    public class TeamUserMappingResponse
    {
            public long Id { get; set; }
            public long TeamId { get; set; }
            public long UserId { get; set; }
    }
}
