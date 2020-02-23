using TrelloAPI.Data;
using System;

namespace TrelloAPI.Models
{
    public class User : IEntity
    {
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EMail { get; set; }
        public string Bio { get; set; }
        public string Image { get; set; }
        public string Sex { get; set; }
        public DateTime BirthDate { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}