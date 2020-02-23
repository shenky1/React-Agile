using Microsoft.AspNetCore.Mvc;
using TrelloAPI.Controllers.Request;
using TrelloAPI.Controllers.Response;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TrelloAPI.Services
{
    public interface IListService
    {
        Task<ActionResult<IEnumerable<ListResponse>>> GetLists();

        Task<ActionResult<ListResponse>> GetList(long id);

        Task<ActionResult<ListResponse>> Update(ListRequest listRequest);

        Task<ActionResult<ListResponse>> Create(ListRequest listRequest);

        Task<ActionResult<ListResponse>> DeleteList(long id);

        Task<IEnumerable<ListResponse>> GetListsForBoard(long id);

        Task<ActionResult<ListResponse>> MoveListLeft(long id);

        Task<ActionResult<ListResponse>> MoveListRight(long id);


    }
}
