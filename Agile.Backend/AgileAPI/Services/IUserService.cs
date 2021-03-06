﻿using TrelloAPI.Models;
using System.Collections.Generic;

namespace TrelloAPI.Services
{
    public interface IUserService
    {
        User Authenticate(string email, string password);
        IEnumerable<User> GetAll();
        User GetById(long id);
        User Create(User user, string password);
        void Update(User user, string password = null);
        void Delete(long id);
    }
}
