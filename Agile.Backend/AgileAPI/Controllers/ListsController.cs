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
    public class ListsController : ControllerBase
    {
        private readonly IListService _ListService;

        public ListsController(IListService Listservice)
        {
            _ListService = Listservice;
        }

        // GET: api/Lists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ListResponse>>> GetLists()
        {
            var Lists = await _ListService.GetLists();
            return Ok(Lists);
        }

        // GET: api/Lists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ListResponse>> GetList(long id)
        {
            var list = await _ListService.GetList(id);

            if (list.Value == null)
            {
                return NotFound();
            }

            return Ok(list);
        }

        // PUT: api/Lists/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutList(long id, ListRequest listRequest)
        {
            if (id != listRequest.Id)
            {
                return BadRequest();
            }

            await _ListService.Update(listRequest);

            return NoContent();
        }

        // POST: api/Lists
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<ListResponse>> PostList(ListRequest listRequest)
        {
            var listResponse = await _ListService.Create(listRequest);

            return CreatedAtAction(nameof(GetList), new { id = listResponse.Value.Id }, listResponse.Value);
        }

        // DELETE: api/Lists/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ListResponse>> DeleteList(long id)
        {
            var list = await _ListService.DeleteList(id);
            if (list.Value == null)
            {
                return NotFound();
            }

            return Ok(list);
        }

        [HttpGet("getListsForBoard/{id}")]
        public async Task<ActionResult<ListResponse>> GetListsForBoard(long id)
        {
            var lists = await _ListService.GetListsForBoard(id);

            if (lists == null)
            {
                return NotFound();
            }

            return Ok(lists);
        }

        [HttpGet("moveListLeft/{id}")]
        public async Task<ActionResult<ListResponse>> MoveListLeft(long id)
        {

            var list = await _ListService.MoveListLeft(id);
            return Ok(list);
        }

        [HttpGet("moveListRight/{id}")]
        public async Task<ActionResult<ListResponse>> MoveListRight(long id)
        {

            var list = await _ListService.MoveListRight(id);
            return Ok(list);
        }
    }
}
