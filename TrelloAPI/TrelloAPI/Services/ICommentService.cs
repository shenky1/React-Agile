using Microsoft.AspNetCore.Mvc;
using TrelloAPI.Controllers.Request;
using TrelloAPI.Controllers.Response;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TrelloAPI.Services
{
    public interface ICommentService
    {
        Task<ActionResult<IEnumerable<CommentResponse>>> GetComments();

        Task<ActionResult<CommentResponse>> GetComment(long id);

        Task<ActionResult<CommentResponse>> Update(CommentRequest commentRequest);

        Task<ActionResult<CommentResponse>> Create(CommentRequest commentRequest);

        Task<ActionResult<CommentResponse>> DeleteComment(long id);


    }
}
