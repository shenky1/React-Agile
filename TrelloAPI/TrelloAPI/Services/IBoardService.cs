using Microsoft.AspNetCore.Mvc;
using TrelloAPI.Controllers.Request;
using TrelloAPI.Controllers.Response;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TrelloAPI.Services
{
    public interface IBoardService
    {
        Task<IEnumerable<BoardResponse>> GetBoards();

        Task<ActionResult<BoardResponse>> GetBoard(long id);

        Task<ActionResult<BoardResponse>> Update(BoardRequest boardRequest);

        Task<ActionResult<BoardResponse>> Create(BoardRequest boardRequest);

        Task<ActionResult<BoardResponse>> DeleteBoard(long id);

        Task<IEnumerable<BoardResponse>> GetBoardsOfUser(long id);



    }
}
