using Microsoft.AspNetCore.Mvc;
using TrelloAPI.Controllers.Request;
using TrelloAPI.Controllers.Response;
using TrelloAPI.Data.EFCore;
using TrelloAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TrelloAPI.Services
{
    public class CommentService : ICommentService
    {
        private readonly CommentRepository _commentRepository;

        public CommentService(CommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        public async Task<ActionResult<IEnumerable<CommentResponse>>> GetComments()
        {
            var comments = await _commentRepository.GetAll();

            var commentResponses = MapModelToResponse(comments);
            return commentResponses;
        }

        public async Task<ActionResult<CommentResponse>> GetComment(long id)
        {
            var comment = await _commentRepository.Get(id);
            var commentResponse = MapModelToResponse(comment);
            return commentResponse;
        }

        public async Task<ActionResult<CommentResponse>> Update(CommentRequest commentRequest)
        {
            var comment = MapRequestToModel(commentRequest);

            comment = await _commentRepository.Update(comment);

            var commentResponse = MapModelToResponse(comment);
            return commentResponse;
        }

        public async Task<ActionResult<CommentResponse>> Create(CommentRequest commentRequest)
        {
            var comment = MapRequestToModel(commentRequest);

            comment = await _commentRepository.Add(comment);

            var commentResponse = MapModelToResponse(comment);
            return commentResponse;
        }

        public async Task<ActionResult<CommentResponse>> DeleteComment(long id)
        {
            var comment = await _commentRepository.Delete(id);

            var commentResponse = MapModelToResponse(comment);
            return commentResponse;
        }


        public Comment MapRequestToModel(CommentRequest commentRequests)
        {
            if (commentRequests == null)
            {
                return null;
            }

            var comment = new Comment
            {
                Id = commentRequests.Id
            };

            return comment;
        }

        public List<Comment> MapRequestToModel(List<CommentRequest> commentRequests)
        {
            if (commentRequests == null)
            {
                return null;
            }

            var comments = new List<Comment>();
            foreach (var commentRequest in commentRequests)
            {
                var comment = MapRequestToModel(commentRequest);
                comments.Add(comment);
            }

            return comments;
        }

        public CommentResponse MapModelToResponse(Comment comment)
        {
            if (comment == null)
            {
                return null;
            }

            var commentResponse = new CommentResponse
            {
                Id = comment.Id
            };

            return commentResponse;
        }

        public List<CommentResponse> MapModelToResponse(List<Comment> comments)
        {
            if (comments == null)
            {
                return null;
            }

            var commentResponses = new List<CommentResponse>();
            foreach (var comment in comments)
            {
                var commentResponse = MapModelToResponse(comment);
                commentResponses.Add(commentResponse);
            }

            return commentResponses;
        }
    }
}
