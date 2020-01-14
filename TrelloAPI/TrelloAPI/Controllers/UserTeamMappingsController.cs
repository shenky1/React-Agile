using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TrelloAPI.Controllers.Request;
using TrelloAPI.Controllers.Response;
using Microsoft.EntityFrameworkCore;
using TrelloAPI.Models;
using TrelloAPI.Services;

namespace TrelloAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamUserMappingsController : ControllerBase
    {
        private readonly ITeamUserMappingService _teamUserMappingService;

        public TeamUserMappingsController(ITeamUserMappingService teamUserMappingService)
        {
            _teamUserMappingService = teamUserMappingService;
        }

        // GET: api/TeamUserMappings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TeamUserMappingResponse>>> GetTeamUserMappings()
        {
            var teamUserMappings = await _teamUserMappingService.GetTeamUserMappings();
            return Ok(teamUserMappings);
        }

        // GET: api/TeamUserMappings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TeamUserMappingResponse>> GetTeamUserMapping(long id)
        {
            var teamUserMapping = await _teamUserMappingService.GetTeamUserMapping(id);

            if (teamUserMapping.Value == null)
            {
                return NotFound();
            }

            return Ok(teamUserMapping);
        }

        // PUT: api/TeamUserMappings/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTeamUserMapping(long id, TeamUserMappingRequest teamUserMappingRequest)
        {
            if (id != teamUserMappingRequest.Id)
            {
                return BadRequest();
            }

            await _teamUserMappingService.Update(teamUserMappingRequest);

            return NoContent();
        }

        // POST: api/TeamUserMappings
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<TeamUserMappingResponse>> PostTeamUserMapping(TeamUserMappingRequest teamUserMappingRequest)
        {
            var teamUserMappingResponse = await _teamUserMappingService.Create(teamUserMappingRequest);


            return CreatedAtAction(nameof(GetTeamUserMapping), new { id = teamUserMappingResponse.Value.Id }, teamUserMappingResponse.Value);
        }

        // DELETE: api/TeamUserMappings/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TeamUserMappingResponse>> DeleteTeamUserMapping(long id)
        {
            var teamUserMapping = await _teamUserMappingService.DeleteTeamUserMapping(id);
            if (teamUserMapping.Value == null)
            {
                return NotFound();
            }

            return Ok(teamUserMapping);
        }
    }
}
