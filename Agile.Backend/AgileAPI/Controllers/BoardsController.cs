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
    public class BoardsController : ControllerBase
    {
        private readonly IBoardService _boardService;

        public BoardsController(IBoardService boardService)
        {
            _boardService = boardService;
        }

        // GET: api/Boards
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BoardResponse>>> GetBoards()
        {
            var boards = await _boardService.GetBoards();
            return Ok(boards);
        }

        // GET: api/Boards/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BoardResponse>> GetBoard(long id)
        {
            var board = await _boardService.GetBoard(id);

            if (board.Value == null)
            {
                return NotFound();
            }

            return Ok(board);
        }

        // PUT: api/Boards/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBoard(long id, BoardRequest boardRequest)
        {
            if (id != boardRequest.Id)
            {
                return BadRequest();
            }

            await _boardService.Update(boardRequest);

            return NoContent();
        }

        // POST: api/Boards
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<BoardResponse>> PostBoard(BoardRequest boardRequest)
        {
            var boardResponse = await _boardService.Create(boardRequest);


            return CreatedAtAction(nameof(GetBoard), new { id = boardResponse.Value.Id }, boardResponse.Value);
        }

        // DELETE: api/Boards/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BoardResponse>> DeleteBoard(long id)
        {
            var board = await _boardService.DeleteBoard(id);
            if (board.Value == null)
            {
                return NotFound();
            }

            return Ok(board);
        }

        [HttpGet("getBoardsOfUser/{id}")]
        public async Task<ActionResult<BoardResponse>> GetBoardsOfUser(long id)
        {
            var boards = await _boardService.GetBoardsOfUser(id);
            if (boards == null)
            {
                return NotFound();
            }

            return Ok(boards);
        }

        [HttpGet("getBoardsForTeam/{id}")]
        public async Task<ActionResult<BoardResponse>> GetBoardsForTeam(long id)
        {
            var boards = await _boardService.GetBoardsForTeam(id);
            if (boards == null)
            {
                return NotFound();
            }

            return Ok(boards);
        }

        [HttpPost("deleteEntireBoard/{id}")]
        public async Task<ActionResult<Board>> DeleteEntireBoard(long id)
        {
            var board = await _boardService.DeleteEntireBoard(id);


            return CreatedAtAction(nameof(GetBoard), board);
        }

    }
}
