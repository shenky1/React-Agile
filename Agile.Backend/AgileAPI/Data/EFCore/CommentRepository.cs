using Microsoft.EntityFrameworkCore;
using TrelloAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrelloAPI.Data.EFCore
{
    public class CommentRepository : EfCoreRepository<Comment, ApplicationDbContext>
    {
        private readonly ApplicationDbContext _context;
        public CommentRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }
        public async Task<List<Comment>> GetCommentsForCard(long id)
        {
            List<Comment> comments = await _context.Comments.Where(comment => comment.CardId == id).ToListAsync();
           
            return comments;
        }
    }
}
