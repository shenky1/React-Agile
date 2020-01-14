using AutoMapper;
using TrelloAPI.Controllers.Users;
using TrelloAPI.Models;

namespace TrelloAPI.Helpers
    {
        public class AutoMapperProfile : Profile
        {
            public AutoMapperProfile()
            {
                CreateMap<User, UserModel>();
                CreateMap<RegisterModel, User>();
                CreateMap<UpdateModel, User>();
            }
        }
    }

