using Microsoft.EntityFrameworkCore;
using TrelloAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TrelloAPI.Controllers.Users;

namespace TrelloAPI.Data.EFCore
{
    public class TeamUserMappingRepository : EfCoreRepository<TeamUserMapping, ApplicationDbContext>
    {
        private readonly ApplicationDbContext _context;
        public TeamUserMappingRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }
        public async Task<List<Team>> GetTeamsForUser(long id)
        {
            var tumList = await _context.TeamUserMappings.Include(x => x).Where(tum => tum.UserId == id).ToListAsync();

            List<Team> userTeams = new List<Team>();
            tumList.ForEach(tum =>
            {
                List<Team> teams = _context.Teams.Where(team => team.Id == tum.TeamId).ToList();
                userTeams.AddRange(teams);
            });
            return userTeams;
        }

        public async Task<List<UserModel>> GetUsersForTeam(long id)
        {
            var tumList = await _context.TeamUserMappings.Include(x => x).Where(tum => tum.TeamId == id).ToListAsync();

            List<UserModel> users = new List<UserModel>();
            tumList.ForEach(tum =>
            {
                User user = _context.Users.FirstOrDefault(user => user.Id == tum.UserId);
                users.Add(new UserModel {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    EMail = user.EMail,
                    Username = user.Username
                });
            });
            return users;
        }

        public async Task<TeamUserMapping> RemoveUserFromTeam(long userId, long teamId)
        {
            var userTeamMapping = _context.TeamUserMappings.FirstOrDefault(tum => tum.TeamId == teamId && tum.UserId == userId);

            _context.TeamUserMappings.Remove(userTeamMapping);
            await _context.SaveChangesAsync();

            return userTeamMapping;
        }
    }
}
