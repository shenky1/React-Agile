using Microsoft.AspNetCore.Mvc;
using TrelloAPI.Controllers.Request;
using TrelloAPI.Controllers.Users;
using System.Collections.Generic;
using System.Threading.Tasks;
using TrelloAPI.Models;

namespace TrelloAPI.Services
{
    public interface ITeamService
    {
        Task<ActionResult<IEnumerable<TeamResponse>>> GetTeams();

        Task<ActionResult<TeamResponse>> GetTeam(long id);

        Task<ActionResult<TeamResponse>> Update(TeamRequest teamRequest);

        Task<ActionResult<TeamResponse>> Create(TeamRequest teamRequest);

        Task<ActionResult<TeamResponse>> DeleteTeam(long id);

        Task<Team> UpdateTeamUsers(long id, List<UserModel> users);

        Task<Team> DeleteEntireTeam(long id);

    }
}
