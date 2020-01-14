using Microsoft.EntityFrameworkCore;
using TrelloAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrelloAPI.Data.EFCore
{
    public class BoardRepository : EfCoreRepository<Board, ApplicationDbContext>
    {
        private readonly ApplicationDbContext _context;
        public BoardRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }
        public async Task<List<Board>> GetBoardsOfUser(long id)
        {
            var tumList = await _context.TeamUserMappings.Include(x => x).Where(tum => tum.UserId == id).ToListAsync();
            List<Board> userBoards = new List<Board>();
            tumList.ForEach(tum =>
            {
               List<Board> boards = _context.Boards.Where(board => board.TeamId == tum.TeamId).ToList();
                userBoards.AddRange(boards);
            });
            return userBoards;
        }
    }
}
