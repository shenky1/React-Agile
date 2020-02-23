using Microsoft.AspNetCore.Mvc;
using TrelloAPI.Controllers.Request;
using TrelloAPI.Controllers.Response;
using TrelloAPI.Controllers.Users;
using System.Collections.Generic;
using System.Threading.Tasks;
using TrelloAPI.Models;

namespace TrelloAPI.Services
{
    public interface ITeamUserMappingService
    {
        Task<ActionResult<IEnumerable<TeamUserMappingResponse>>> GetTeamUserMappings();

        Task<ActionResult<TeamUserMappingResponse>> GetTeamUserMapping(long id);

        Task<ActionResult<TeamUserMappingResponse>> Update(TeamUserMappingRequest teamUserMappingRequest);

        Task<ActionResult<TeamUserMappingResponse>> Create(TeamUserMappingRequest teamUserMappingRequest);

        Task<ActionResult<TeamUserMappingResponse>> DeleteTeamUserMapping(long id);

        Task<List<Team>> GetTeamsForUser(long id);

        Task<List<User>> GetUsersForTeam(long id);

        Task<TeamUserMapping> RemoveUserFromTeam(long userId, long teamId);


    }
}
