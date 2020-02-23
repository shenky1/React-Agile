using Microsoft.EntityFrameworkCore;
using TrelloAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrelloAPI.Data.EFCore
{
    public class CardRepository : EfCoreRepository<Card, ApplicationDbContext>
    {
        private readonly ApplicationDbContext _context;
        public CardRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<Card>> GetCardsForList(long id)
        {
            var cards = await _context.Cards.Where(card => card.ListId == id).ToListAsync();
            return cards;
        }
    }
}
