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

        public async Task<List<Board>> GetBoardsForTeam(long id)
        {
            var boards = await _context.Boards.Where(board => board.TeamId == id).ToListAsync();
            
            return boards;
        }

        public async Task<Board> DeleteEntireBoard(long id)
        {
            Board board = _context.Boards.FirstOrDefault(board => board.Id == id);
            List<List> lists = _context.Lists.Where(list => list.BoardId == board.Id).ToList();
            lists.ForEach(list =>
            {
                List<Card> cards = _context.Cards.Where(card => card.ListId == list.Id).ToList();
                cards.ForEach(card =>
                {
                    List<Comment> comments = _context.Comments.Where(comment => comment.CardId == card.Id).ToList();
                    _context.RemoveRange(comments);
                });
                _context.RemoveRange(cards);
            });
            _context.RemoveRange(lists);
            _context.Remove(board);
            await _context.SaveChangesAsync();
            return board;
        }
    }
}
