using System.Collections.Generic;
using System.Threading.Tasks;
using TrelloAPI.Controllers.Request;
using TrelloAPI.Controllers.Response;
using Microsoft.AspNetCore.Mvc;


namespace TrelloAPI.Services
{
    public interface ICardService
    {
        Task<ActionResult<IEnumerable<CardResponse>>> GetCards();

        Task<ActionResult<CardResponse>> GetCard(long id);

        Task<ActionResult<CardResponse>> Update(CardRequest cardRequest);

        Task<ActionResult<CardResponse>> Create(CardRequest boardRequest);

        Task<ActionResult<CardResponse>> DeleteCard(long id);

        Task<IEnumerable<CardResponse>> GetCardsForList(long id);

    }
}
