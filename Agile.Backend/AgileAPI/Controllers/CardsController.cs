using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TrelloAPI.Controllers.Request;
using TrelloAPI.Controllers.Response;
using TrelloAPI.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TrelloAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardController : ControllerBase
    {
        private readonly ICardService _cardService;

        public CardController(ICardService cardService)
        {
            _cardService = cardService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CardResponse>>> GetCards()
        {
            var cards = await _cardService.GetCards();
            return Ok(cards);
        }

        // GET: api/Boards/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CardResponse>> GetCard(long id)
        {
            var card = await _cardService.GetCard(id);

            if (card.Value == null)
            {
                return NotFound();
            }

            return Ok(card);
        }

        // PUT: api/Boards/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCard(long id, CardRequest cardRequest)
        {
            if (id != cardRequest.Id)
            {
                return BadRequest();
            }

            await _cardService.Update(cardRequest);

            return NoContent();
        }

        // POST: api/Boards
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<CardResponse>> PostCard(CardRequest cardRequest)
        {
            var cardResponse = await _cardService.Create(cardRequest);


            return CreatedAtAction(nameof(GetCard), new { id = cardResponse.Value.Id }, cardResponse.Value);
        }

        // DELETE: api/Boards/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<CardResponse>> DeleteCard(long id)
        {
            var card = await _cardService.DeleteCard(id);
            if (card.Value == null)
            {
                return NotFound();
            }

            return Ok(card);
        }

        [HttpGet("getCardsForList/{id}")]
        public async Task<ActionResult<IEnumerable<CardResponse>>> GetCardsForList(long id)
        {
            var cards = await _cardService.GetCardsForList(id);
            return Ok(cards);
        }
    }
}