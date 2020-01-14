using System.Collections.Generic;
using System.Linq;
using TrelloAPI.Data;
using TrelloAPI.Services;

namespace TrelloAPI.Models
{
    public class DataSeeder
    {
        public static void SeedDatabase(ApplicationDbContext context, UserService userService)
        {
            if(!context.Users.Any())
            {
                userService.Create(new User
                {
                    Id = 1,
                    FirstName = "Matija",
                    LastName = "Selendic",
                    EMail = "matijaselendic@gmail.com",
                    Username = "user"
                }, "pass");
            }

            if (!context.Boards.Any())
            {
                var boards = new List<Board>
                {
                    new Board
                    {
                        Id = 1,
                        TeamId = 1,
                        Name = "Trello Board",
                        ImageUrl = "https://wallpaperplay.com/walls/full/0/2/2/82794.jpg",
                        Description ="Developing Trello application. Used by business analysts for taking care of project management."
                    },
                    new Board
                    {
                        Id = 2,
                        TeamId = 1,
                        Name = "Trello Board 2",
                        ImageUrl = "https://www.elsetge.cat/myimg/f/147-1475661_download-parchment-paper-texture-picture-free-graph.jpg",
                        Description ="Developing Trello 2 application. Clone of trello. Created by students."
                  },
                    new Board
                    {
                        Id = 3,
                        TeamId = 2,
                        Name = "PMF Board",
                        ImageUrl = "https://i.pinimg.com/originals/e1/09/2d/e1092db6cd8fe8650e9dfe93719736a6.jpg",
                        Description ="Used by PMF students and professors."
                    },
                    new Board
                    {
                        Id = 4,
                        TeamId = 2,
                        Name = "PMF Board 2",
                        ImageUrl = "https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&w=1000&q=80",
                        Description ="Description default"
               },

                };
                context.AddRange(boards);
            }

                if (!context.Lists.Any())
                {
                    var lists = new List<List>
                    {
                        new List
                        {
                            Id = 1,
                            BoardId = 1,
                            Name = "To Do",
                            OrderId = 1
                        },
                        new List
                        {
                            Id = 2,
                            BoardId = 1,
                            Name = "In Progress",
                            OrderId = 2
                        },
                        new List
                        {
                            Id = 3,
                            BoardId = 1,
                            Name = "Done",
                            OrderId = 3
                        }

                    };
                    context.AddRange(lists);
                }

                if (!context.Cards.Any())
                {
                    var cards = new List<Card>
                    {
                        new Card
                        {
                            Id = 1,
                            AssigneId = 1,
                            ListId = 2,
                            Title = "Create Login Page",
                            Description = "Login for Trello, with signup included",
                            DueDate = new System.DateTime(2020, 1, 12)
                        },
                        new Card
                        {
                            Id = 2,
                            AssigneId = 1,
                            ListId = 1,
                            Title = "Create Home Page",
                            Description = "Home Page for Trello, with sidebar and topbar",
                            DueDate = new System.DateTime(2020, 1, 12)
                        },
                        new Card
                        {
                            Id = 3,
                            AssigneId = 2,
                            ListId = 1,
                            Title = "Create Boards Page",
                            Description = "Boards page",
                            DueDate = new System.DateTime(2020, 1, 12)
                        },

                    };
                    context.AddRange(cards);
                }

                if (!context.Comments.Any())
                {
                    var comments = new List<Comment>
                    {
                        new Comment
                        {
                            Id = 1,
                            UserId = 1,
                            CardId = 1,
                            Content = "This is completed.",
                            Date = new System.DateTime(2020, 1, 12)
                        }
                    };
                    context.AddRange(comments);
                }
                if (!context.Teams.Any())
                {
                    var teams = new List<Team>
                    {
                        new Team
                        {
                            Id = 1,
                            AuthorId = 1,
                            Name = "Trello guys"
                        },
                        new Team
                        {
                            Id = 2,
                            AuthorId = 4,
                            Name = "PMF - best of the best"
                        }
                    };
                    context.AddRange(teams);
                }
                if (!context.TeamUserMappings.Any())
                {
                    var userTeamMappings = new List<TeamUserMapping>
                    {
                        new TeamUserMapping
                        {
                            Id = 1,
                            UserId = 1,
                            TeamId = 1
                        },
                        new TeamUserMapping
                        {
                            Id = 2,
                            UserId = 2,
                            TeamId = 1
                        },
                        new TeamUserMapping
                        {
                            Id = 3,
                            UserId = 3,
                            TeamId = 1
                        },
                        new TeamUserMapping
                        {
                            Id = 4,
                            UserId = 4,
                            TeamId = 2
                        },
                        new TeamUserMapping
                        {
                            Id = 5,
                            UserId = 5,
                            TeamId = 2
                        },
                        new TeamUserMapping
                        {
                            Id = 6,
                            UserId = 6,
                            TeamId = 2
                        },
                        new TeamUserMapping
                        {
                            Id = 7,
                            UserId = 1,
                            TeamId = 2
                        },

                    };
                    context.AddRange(userTeamMappings);
                }

                context.SaveChanges();
        }
    }
}
