using System;
namespace TrelloAPI.Controllers.Users
{
    public class UpdateModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public DateTime BirthDate { get; set; }
        public string Sex { get; set; }
        public string EMail { get; set; }
        public string Bio { get; set; }
        public string Image { get; set; }
    }
}
