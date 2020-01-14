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
    public class CommentsController : ControllerBase
    {
        private readonly ICommentService _commentService;

        public CommentsController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        // GET: api/Boards
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommentResponse>>> GetCommments()
        {
            var commments = await _commentService.GetComments();
            return Ok(commments);
        }

        // GET: api/Boards/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CommentResponse>> GetCommment(long id)
        {
            var commment = await _commentService.GetComment(id);

            if (commment.Value == null)
            {
                return NotFound();
            }

            return Ok(commment);
        }

        // PUT: api/Boards/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutComment(long id, CommentRequest commentRequest)
        {
            if (id != commentRequest.Id)
            {
                return BadRequest();
            }

            await _commentService.Update(commentRequest);

            return NoContent();
        }

        // POST: api/Boards
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Board>> PostBoard(CommentRequest commentRequest)
        {
            var commentResponse = await _commentService.Create(commentRequest);


            return CreatedAtAction(nameof(GetCommment), new { id = commentResponse.Value.Id }, commentResponse.Value);
        }

        // DELETE: api/Boards/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<CommentResponse>> DeleteComment(long id)
        {
            var commment = await _commentService.DeleteComment(id);
            if (commment.Value == null)
            {
                return NotFound();
            }

            return Ok(commment);
        }
    }
}
