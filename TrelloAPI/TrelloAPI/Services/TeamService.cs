using Microsoft.AspNetCore.Mvc;
using TrelloAPI.Controllers.Request;
using TrelloAPI.Controllers.Response;
using TrelloAPI.Data.EFCore;
using TrelloAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TrelloAPI.Services
{
    public class TeamService : ITeamService
    {
        private readonly TeamRepository _teamRepository;

        public TeamService(TeamRepository teamRepository)
        {
            _teamRepository = teamRepository;
        }

        public async Task<ActionResult<IEnumerable<TeamResponse>>> GetTeams()
        {
            var teams = await _teamRepository.GetAll();

            var teamResponses = MapModelToResponse(teams);
            return teamResponses;
        }

        public async Task<ActionResult<TeamResponse>> GetTeam(long id)
        {
            var team = await _teamRepository.Get(id);

            var teamResponse = MapModelToResponse(team);
            return teamResponse;
        }

        public async Task<ActionResult<TeamResponse>> Update(TeamRequest teamRequest)
        {
            var team = MapRequestToModel(teamRequest);

            team = await _teamRepository.Update(team);

            var teamResponse = MapModelToResponse(team);
            return teamResponse;
        }

        public async Task<ActionResult<TeamResponse>> Create(TeamRequest teamRequest)
        {
            var team = MapRequestToModel(teamRequest);

            team = await _teamRepository.Add(team);

            var teamResponse = MapModelToResponse(team);
            return teamResponse;
        }

        public async Task<ActionResult<TeamResponse>> DeleteTeam(long id)
        {
            var team = await _teamRepository.Delete(id);

            var teamResponse = MapModelToResponse(team);
            return teamResponse;
        }

        public void GetTeamsForUser(long id)
        {
            return;
        }


        public Team MapRequestToModel(TeamRequest teamRequest)
        {
            if (teamRequest == null)
            {
                return null;
            }

            var team = new Team
            {
                Id = teamRequest.Id,
                Name = teamRequest.Name
            };

            return team;
        }

        public List<Team> MapRequestToModel(List<TeamRequest> teamRequests)
        {
            if (teamRequests == null)
            {
                return null;
            }

            var teams = new List<Team>();
            foreach (var teamRequest in teamRequests)
            {
                var team = MapRequestToModel(teamRequest);
                teams.Add(team);
            }

            return teams;
        }

        public TeamResponse MapModelToResponse(Team team)
        {
            if (team == null)
            {
                return null;
            }

            var teamResponse = new TeamResponse
            {
                Id = team.Id,
                Name = team.Name
            };

            return teamResponse;
        }

        public List<TeamResponse> MapModelToResponse(List<Team> teams)
        {
            if (teams == null)
            {
                return null;
            }

            var teamResponses = new List<TeamResponse>();
            foreach (var team in teams)
            {
                var teamResponse = MapModelToResponse(team);
                teamResponses.Add(teamResponse);
            }

            return teamResponses;
        }
    }
}
