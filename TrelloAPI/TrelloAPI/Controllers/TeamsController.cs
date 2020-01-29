using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TrelloAPI.Controllers.Request;
using TrelloAPI.Controllers.Users;
using Microsoft.EntityFrameworkCore;
using TrelloAPI.Models;
using TrelloAPI.Services;

namespace TrelloAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamsController : ControllerBase
    {
        private readonly ITeamService _teamService;

        public TeamsController(ITeamService teamService)
        {
            _teamService = teamService;
        }

        // GET: api/Teams
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TeamResponse>>> GetTeams()
        {
            var teams = await _teamService.GetTeams();
            return Ok(teams);
        }

        // GET: api/Teams/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TeamResponse>> GetTeam(long id)
        {
            var team = await _teamService.GetTeam(id);

            if (team.Value == null)
            {
                return NotFound();
            }

            return Ok(team);
        }

        // PUT: api/Teams/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTeam(long id, TeamRequest teamRequest)
        {
            if (id != teamRequest.Id)
            {
                return BadRequest();
            }

            await _teamService.Update(teamRequest);

            return NoContent();
        }

        // POST: api/Teams
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<TeamResponse>> PostTeam(TeamRequest teamRequest)
        {
            var teamResponse = await _teamService.Create(teamRequest);


            return CreatedAtAction(nameof(GetTeam), new { id = teamResponse.Value.Id }, teamResponse.Value);
        }

        // DELETE: api/Teams/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TeamResponse>> DeleteTeam(long id)
        {
            var team = await _teamService.DeleteTeam(id);
            if (team.Value == null)
            {
                return NotFound();
            }

            return Ok(team);
        }

        [HttpPost("updateTeamUsers/{id}")]
        public async Task<ActionResult<Team>> UpdateTeamUsers(long id, List<UserModel> users)
        {
            var team = await _teamService.UpdateTeamUsers(id, users);

            return Ok(team);
        }

        [HttpPost("deleteEntireTeam/{id}")]
        public async Task<ActionResult<Team>> DeleteEntireTeam(long id)
        {
            var team = await _teamService.DeleteEntireTeam(id);

            return CreatedAtAction(nameof(GetTeam), team);
        }

    }
}
