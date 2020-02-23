using Microsoft.AspNetCore.Mvc;
using TrelloAPI.Controllers.Request;
using TrelloAPI.Controllers.Response;
using TrelloAPI.Controllers.Users;
using TrelloAPI.Data.EFCore;
using TrelloAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TrelloAPI.Services
{
    public class TeamUserMappingService : ITeamUserMappingService
    {
        private readonly TeamUserMappingRepository _teamUserMappingRepository;

        public TeamUserMappingService(TeamUserMappingRepository teamUserMappingRepository)
        {
            _teamUserMappingRepository = teamUserMappingRepository;
        }

        public async Task<ActionResult<IEnumerable<TeamUserMappingResponse>>> GetTeamUserMappings()
        {
            var teamUserMappings = await _teamUserMappingRepository.GetAll();

            var teamUserMappingResponses = MapModelToResponse(teamUserMappings);
            return teamUserMappingResponses;
        }

        public async Task<ActionResult<TeamUserMappingResponse>> GetTeamUserMapping(long id)
        {
            var teamUserMapping = await _teamUserMappingRepository.Get(id);

            var teamUserMappingResponse = MapModelToResponse(teamUserMapping);
            return teamUserMappingResponse;
        }

        public async Task<ActionResult<TeamUserMappingResponse>> Update(TeamUserMappingRequest teamUserMappingRequest)
        {
            var teamUserMapping = MapRequestToModel(teamUserMappingRequest);

            teamUserMapping = await _teamUserMappingRepository.Update(teamUserMapping);

            var teamUserMappingResponse = MapModelToResponse(teamUserMapping);
            return teamUserMappingResponse;
        }

        public async Task<ActionResult<TeamUserMappingResponse>> Create(TeamUserMappingRequest teamUserMappingRequest)
        {
            var teamUserMapping = MapRequestToModel(teamUserMappingRequest);

            teamUserMapping = await _teamUserMappingRepository.Add(teamUserMapping);

            var teamUserMappingResponse = MapModelToResponse(teamUserMapping);
            return teamUserMappingResponse;
        }

        public async Task<ActionResult<TeamUserMappingResponse>> DeleteTeamUserMapping(long id)
        {
            var teamUserMapping = await _teamUserMappingRepository.Delete(id);

            var teamUserMappingResponse = MapModelToResponse(teamUserMapping);
            return teamUserMappingResponse;
        }

        public async Task<List<Team>> GetTeamsForUser(long id)
        {
            var teams = await _teamUserMappingRepository.GetTeamsForUser(id);
            return teams;
        }

        public async Task<List<User>> GetUsersForTeam(long id)
        {
            var users = await _teamUserMappingRepository.GetUsersForTeam(id);
            return users;
        }

        public async Task<TeamUserMapping> RemoveUserFromTeam(long userId, long teamId)
        {
            var tum = await _teamUserMappingRepository.RemoveUserFromTeam(userId, teamId);
            return tum;
        }


        public TeamUserMapping MapRequestToModel(TeamUserMappingRequest teamUserMappingRequest)
        {
            if (teamUserMappingRequest == null)
            {
                return null;
            }

            var teamUserMapping = new TeamUserMapping
            {
                Id = teamUserMappingRequest.Id,
                UserId = teamUserMappingRequest.UserId,
                TeamId = teamUserMappingRequest.TeamId,

            };

            return teamUserMapping;
        }

        public List<TeamUserMapping> MapRequestToModel(List<TeamUserMappingRequest> teamUserMappingRequests)
        {
            if (teamUserMappingRequests == null)
            {
                return null;
            }

            var teamUserMappings = new List<TeamUserMapping>();
            foreach (var teamUserMappingRequest in teamUserMappingRequests)
            {
                var teamUserMapping = MapRequestToModel(teamUserMappingRequest);
                teamUserMappings.Add(teamUserMapping);
            }

            return teamUserMappings;
        }

        public TeamUserMappingResponse MapModelToResponse(TeamUserMapping teamUserMapping)
        {
            if (teamUserMapping == null)
            {
                return null;
            }

            var teamUserMappingResponse = new TeamUserMappingResponse
            {
                Id = teamUserMapping.Id,
                UserId = teamUserMapping.UserId,
                TeamId = teamUserMapping.TeamId,
            };

            return teamUserMappingResponse;
        }

        public List<TeamUserMappingResponse> MapModelToResponse(List<TeamUserMapping> teamUserMappings)
        {
            if (teamUserMappings == null)
            {
                return null;
            }

            var teamUserMappingResponses = new List<TeamUserMappingResponse>();
            foreach (var teamUserMapping in teamUserMappings)
            {
                var teamUserMappingResponse = MapModelToResponse(teamUserMapping);
                teamUserMappingResponses.Add(teamUserMappingResponse);
            }

            return teamUserMappingResponses;
        }
    }
}
