using Microsoft.EntityFrameworkCore;
using TrelloAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrelloAPI.Data.EFCore
{
    public class TeamRepository : EfCoreRepository<Team, ApplicationDbContext>
    {

        public TeamRepository(ApplicationDbContext context) : base(context)
        {
        
        }
    }

}
