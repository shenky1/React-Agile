using Microsoft.EntityFrameworkCore;
using TrelloAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TrelloAPI.Controllers.Users;
namespace TrelloAPI.Data.EFCore
{
    public class TeamRepository : EfCoreRepository<Team, ApplicationDbContext>
    {

        private readonly ApplicationDbContext _context;
        public TeamRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Team> UpdateTeamUsers(long teamId, List<UserModel> users)
        {
            var teamMappings = _context.TeamUserMappings.Where(tum => tum.TeamId == teamId);
            _context.TeamUserMappings.RemoveRange(teamMappings);
            _context.SaveChanges();
            users.ForEach(user =>
            {
                _context.TeamUserMappings.Add(new TeamUserMapping {
                    UserId = user.Id,
                    TeamId = teamId
                });
            });

            await _context.SaveChangesAsync();

            var team = _context.Teams.First(team => team.Id == teamId);
            return team;
        }

        public async Task<Team> DeleteEntireTeam(long teamId)
        {
            var teamMappings = _context.TeamUserMappings.Where(tum => tum.TeamId == teamId);
            _context.TeamUserMappings.RemoveRange(teamMappings);
            _context.SaveChanges();
            Team team = _context.Teams.FirstOrDefault(team => team.Id == teamId);
            _context.Remove(team);
            await _context.SaveChangesAsync();

            return team;
        }
    }

}
