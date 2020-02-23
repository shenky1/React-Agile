using Microsoft.AspNetCore.Mvc;
using TrelloAPI.Controllers.Request;
using TrelloAPI.Controllers.Response;
using TrelloAPI.Data.EFCore;
using TrelloAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TrelloAPI.Services
{
    public class ListService : IListService
    {
        private readonly ListRepository _listRepository;

        public ListService(ListRepository listRepository)
        {
            _listRepository = listRepository;
        }

        public async Task<ActionResult<IEnumerable<ListResponse>>> GetLists()
        {
            var lists = await _listRepository.GetAll();

            var listResponses = MapModelToResponse(lists);
            return listResponses;
        }

        public async Task<ActionResult<ListResponse>> GetList(long id)
        {
            var list = await _listRepository.Get(id);

            var listResponse = MapModelToResponse(list);
            return listResponse;
        }

        public async Task<ActionResult<ListResponse>> Update(ListRequest listRequest)
        {
            var list = MapRequestToModel(listRequest);

            list = await _listRepository.Update(list);

            var listResponse = MapModelToResponse(list);
            return listResponse;
        }

        public async Task<ActionResult<ListResponse>> Create(ListRequest listRequest)
        {
            var list = MapRequestToModel(listRequest);

            list = await _listRepository.AddToEnd(list);

            var listResponse = MapModelToResponse(list);
            return listResponse;
        }

        public async Task<ActionResult<ListResponse>> DeleteList(long id)
        {
            var list = await _listRepository.Delete(id);
            _listRepository.DeleteCardsOfList(id);

            var listResponse = MapModelToResponse(list);
            return listResponse;
        }

        public async Task<IEnumerable<ListResponse>> GetListsForBoard(long id)
        {
            var lists = await _listRepository.GetListsForBoard(id);

            var listResponse = MapModelToResponse(lists);
            return listResponse;
        }

        public async Task<ActionResult<ListResponse>> MoveListLeft(long id)
        {

            var list = await _listRepository.MoveListLeft(id);

            var listResponse = MapModelToResponse(list);
            return listResponse;
        }

        public async Task<ActionResult<ListResponse>> MoveListRight(long id)
        {

            var list = await _listRepository.MoveListRight(id);

            var listResponse = MapModelToResponse(list);
            return listResponse;
        }


        public List MapRequestToModel(ListRequest listRequest)
        {
            if (listRequest == null)
            {
                return null;
            }

            var list = new List
            {
                Id = listRequest.Id,
                Name = listRequest.Name,
                OrderId = listRequest.OrderId,
                BoardId = listRequest.BoardId
            };

            return list;
        }

        public List<List> MapRequestToModel(List<ListRequest> listRequests)
        {
            if (listRequests == null)
            {
                return null;
            }

            var lists = new List<List>();
            foreach (var listRequest in listRequests)
            {
                var list = MapRequestToModel(listRequest);
                lists.Add(list);
            }

            return lists;
        }

        public ListResponse MapModelToResponse(List list)
        {
            if (list == null)
            {
                return null;
            }

            var listResponse = new ListResponse
            {
                Id = list.Id,
                Name = list.Name,
                OrderId = list.OrderId,
                BoardId = list.BoardId
            };

            return listResponse;
        }

        public List<ListResponse> MapModelToResponse(List<List> lists)
        {
            if (lists == null)
            {
                return null;
            }

            var listResponses = new List<ListResponse>();
            foreach (var list in lists)
            {
                var listResponse = MapModelToResponse(list);
                listResponses.Add(listResponse);
            }

            return listResponses;
        }
    }
}
