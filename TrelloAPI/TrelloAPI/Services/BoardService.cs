using Microsoft.AspNetCore.Mvc;
using TrelloAPI.Controllers.Request;
using TrelloAPI.Controllers.Response;
using TrelloAPI.Data.EFCore;
using TrelloAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TrelloAPI.Services
{
    public class BoardService : IBoardService
    {
        private readonly BoardRepository _boardRepository;

        public BoardService(BoardRepository boardRepository)
        {
            _boardRepository = boardRepository;
        }

        public async Task<IEnumerable<BoardResponse>> GetBoards()
        {
            var boards = await _boardRepository.GetAll();

            var boardResponses = MapModelToResponse(boards);
            return boardResponses;
        }

        public async Task<ActionResult<BoardResponse>> GetBoard(long id)
        {
            var board = await _boardRepository.Get(id);

            var boardResponse = MapModelToResponse(board);
            return boardResponse;
        }

        public async Task<ActionResult<BoardResponse>> Update(BoardRequest boardRequest)
        {
            var board = MapRequestToModel(boardRequest);

            board = await _boardRepository.Update(board);

            var boardResponse = MapModelToResponse(board);
            return boardResponse;
        }

        public async Task<ActionResult<BoardResponse>> Create(BoardRequest boardRequest)
        {
            var board = MapRequestToModel(boardRequest);

            board = await _boardRepository.Add(board);

            var boardResponse = MapModelToResponse(board);
            return boardResponse;
        }

        public async Task<ActionResult<BoardResponse>> DeleteBoard(long id)
        {
            var board = await _boardRepository.Delete(id);

            var boardResponse = MapModelToResponse(board);
            return boardResponse;
        }

        public async Task<IEnumerable<BoardResponse>> GetBoardsOfUser(long id)
        {
            var boards = await _boardRepository.GetBoardsOfUser(id);

            var boardResponses = MapModelToResponse(boards);
            return boardResponses;
        }


        public Board MapRequestToModel(BoardRequest boardRequest)
        {
            if (boardRequest == null)
            {
                return null;
            }

            var board = new Board
            {
                Id = boardRequest.Id,
                Name = boardRequest.Name,
                ImageUrl = boardRequest.ImageUrl,
                Description = boardRequest.Description
            };

            return board;
        }

        public List<Board> MapRequestToModel(List<BoardRequest> boardRequests)
        {
            if (boardRequests == null)
            {
                return null;
            }

            var boards = new List<Board>();
            foreach (var boardRequest in boardRequests)
            {
                var board = MapRequestToModel(boardRequest);
                boards.Add(board);
            }

            return boards;
        }

        public BoardResponse MapModelToResponse(Board board)
        {
            if (board == null)
            {
                return null;
            }

            var boardResponse = new BoardResponse
            {
                Id = board.Id,
                Name = board.Name,
                ImageUrl = board.ImageUrl,
                Description = board.Description
            };

            return boardResponse;
        }

        public List<BoardResponse> MapModelToResponse(List<Board> boards)
        {
            if (boards == null)
            {
                return null;
            }

            var boardResponses = new List<BoardResponse>();
            foreach (var board in boards)
            {
                var boardResponse = MapModelToResponse(board);
                boardResponses.Add(boardResponse);
            }

            return boardResponses;
        }
    }
}
