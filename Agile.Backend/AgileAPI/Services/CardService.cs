using Microsoft.AspNetCore.Mvc;
using TrelloAPI.Controllers.Request;
using TrelloAPI.Controllers.Response;
using TrelloAPI.Data.EFCore;
using TrelloAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TrelloAPI.Services
{
    public class CardService : ICardService
    {
        private readonly CardRepository _cardRepository;

        public CardService(CardRepository cardRepository)
        {
            _cardRepository = cardRepository;
        }

        public async Task<ActionResult<IEnumerable<CardResponse>>> GetCards()
        {
            var cards = await _cardRepository.GetAll();

            var cardResponses = MapModelToResponse(cards);
            return cardResponses;
        }

        public async Task<ActionResult<CardResponse>> GetCard(long id)
        {
            var card = await _cardRepository.Get(id);

            var cardResponse = MapModelToResponse(card);
            return cardResponse;
        }

        public async Task<ActionResult<CardResponse>> Update(CardRequest cardRequest)
        {
            var card = MapRequestToModel(cardRequest);

            card = await _cardRepository.Update(card);

            var cardResponse = MapModelToResponse(card);
            return cardResponse;
        }

        public async Task<ActionResult<CardResponse>> Create(CardRequest cardRequest)
        {
            var card = MapRequestToModel(cardRequest);

            card = await _cardRepository.Add(card);

            var cardResponse = MapModelToResponse(card);
            return cardResponse;
        }

        public async Task<ActionResult<CardResponse>> DeleteCard(long id)
        {
            var card = await _cardRepository.Delete(id);

            var cardResponse = MapModelToResponse(card);
            return cardResponse;
        }

        public async Task<IEnumerable<CardResponse>> GetCardsForList(long id)
        {
            var cards = await _cardRepository.GetCardsForList(id);

            var cardResponses = MapModelToResponse(cards);
            return cardResponses;
        }


        public Card MapRequestToModel(CardRequest cardRequest)
        {
            if (cardRequest == null)
            {
                return null;
            }

            var card = new Card
            {
                Id = cardRequest.Id,
                Title = cardRequest.Title,
                ListId = cardRequest.ListId,
                AssigneId = cardRequest.AssigneId,
                DueDate = cardRequest.DueDate
            };

            return card;
        }

        public List<Card> MapRequestToModel(List<CardRequest> cardRequests)
        {
            if (cardRequests == null)
            {
                return null;
            }

            var cards = new List<Card>();
            foreach (var cardRequest in cardRequests)
            {
                var card = MapRequestToModel(cardRequest);
                cards.Add(card);
            }

            return cards;
        }

        public CardResponse MapModelToResponse(Card card)
        {
            if (card == null)
            {
                return null;
            }

            var cardResponse = new CardResponse
            {
                Id = card.Id,
                Title = card.Title,
                ListId = card.ListId,
                AssigneId = card.AssigneId,
                DueDate = card.DueDate
            };

            return cardResponse;
        }

        public List<CardResponse> MapModelToResponse(List<Card> cards)
        {
            if (cards == null)
            {
                return null;
            }

            var cardResponses = new List<CardResponse>();
            foreach (var card in cards)
            {
                var cardResponse = MapModelToResponse(card);
                cardResponses.Add(cardResponse);
            }

            return cardResponses;
        }
    }
}
