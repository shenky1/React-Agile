using Microsoft.EntityFrameworkCore;
using TrelloAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace TrelloAPI.Data.EFCore
{
    public class ListRepository : EfCoreRepository<List, ApplicationDbContext>
    {
        private readonly ApplicationDbContext _context;
        public ListRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<List>> GetListsForBoard(long id)
        {
            var listsForBoard = await _context.Lists.Where(list => list.BoardId == id).ToListAsync();

            return listsForBoard;
        }

        public async Task<List> MoveListLeft(long id)
        {
            List listToMove = _context.Lists.Find(id);
            List listToSwitch = _context.Lists
                              .Where(list => list.BoardId == listToMove.BoardId)
                              .Where(list => list.OrderId < listToMove.OrderId).OrderByDescending(x => x.OrderId).FirstOrDefault();

            long orderId = listToSwitch.OrderId;
            listToSwitch.OrderId = listToMove.OrderId;
            listToMove.OrderId = orderId;
            _context.SaveChanges();

            return listToMove;
        }
        public async Task<List> MoveListRight(long id)
        {
            List listToMove = _context.Lists.Find(id);
            List listToSwitch = _context.Lists
                               .Where(list => list.BoardId == listToMove.BoardId)
                               .Where(list => list.OrderId > listToMove.OrderId).OrderBy(x => x.OrderId).FirstOrDefault();

            long orderId = listToSwitch.OrderId;
            listToSwitch.OrderId = listToMove.OrderId;
            listToMove.OrderId = orderId;
            _context.SaveChanges();

            return listToMove;
        }

        public async Task<List> AddToEnd(List list)
        {
            var lists = _context.Lists
                               .Where(list1 => list1.BoardId == list.BoardId);
            if (lists.Count() == 0)
            {
                list.OrderId = 1;
            }
            else
            {
                var maxOrderId = lists.Max(list => list.OrderId);
                list.OrderId = maxOrderId + 1;
            }

            _context.Set<List>().Add(list);
            await _context.SaveChangesAsync();
            return list;
        }

        public void DeleteCardsOfList(long id)
        {

            List<Card> cards = _context.Cards.Where(card => card.ListId == id).ToList();
            cards.ForEach(card =>
            {
                _context.Set<Card>().Remove(card);
            });

            _context.SaveChanges();
        }
    }
}
