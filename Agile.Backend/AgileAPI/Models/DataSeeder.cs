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
                    Username = "matija"
                }, "matijinasifra");

                userService.Create(new User
                {
                    Id = 2,
                    FirstName = "Stjepan",
                    LastName = "Selendic",
                    EMail = "stjepanselendic@gmail.com",
                    Username = "stjepan"
                }, "stjepanovasifra");

                userService.Create(new User
                {
                    Id = 3,
                    FirstName = "Josip",
                    LastName = "Josipovic",
                    EMail = "josipjosipovic@gmail.com",
                    Username = "josip"
                }, "josipovasifra");

                userService.Create(new User
                {
                    Id = 4,
                    FirstName = "Ivan",
                    LastName = "Ivic",
                    EMail = "ivanivic@gmail.com",
                    Username = "ivan"
                }, "ivanovasifra");

                userService.Create(new User
                {
                    Id = 5,
                    FirstName = "Karlo",
                    LastName = "Karlic",
                    EMail = "karlokarlic@gmail.com",
                    Username = "karlo"
                }, "karlovasifra");

                userService.Create(new User
                {
                    Id = 6,
                    FirstName = "Ana",
                    LastName = "Anic",
                    EMail = "anaanic@gmail.com",
                    Username = "ana"
                }, "aninasifra");

                userService.Create(new User
                {
                    Id = 7,
                    FirstName = "Martina",
                    LastName = "Selendic",
                    EMail = "martinaselendic@gmail.com",
                    Username = "martina"
                }, "martininasifra");

                userService.Create(new User
                {
                    Id = 8,
                    FirstName = "Kristina",
                    LastName = "Krstanovic",
                    EMail = "kristinakrstanovic@gmail.com",
                    Username = "kristina"
                }, "krstanovic");

                userService.Create(new User
                {
                    Id = 9,
                    FirstName = "Zvonimir",
                    LastName = "Zvonko",
                    EMail = "zvonimirzvonko@gmail.com",
                    Username = "zvonimir"
                }, "zvonimirovasifra");

                userService.Create(new User
                {
                    Id = 10,
                    FirstName = "Martin",
                    LastName = "Martincic",
                    EMail = "martinmartincic@gmail.com",
                    Username = "martin"
                }, "martinovasifra");

                userService.Create(new User
                {
                    Id = 11,
                    FirstName = "Fran",
                    LastName = "Franic",
                    EMail = "franfranic@gmail.com",
                    Username = "fran"
                }, "franovasifra");

                userService.Create(new User
                {
                    Id = 12,
                    FirstName = "Iva",
                    LastName = "Ivic",
                    EMail = "ivaivic@gmail.com",
                    Username = "iva"
                }, "ivinasifra");

                userService.Create(new User
                {
                    Id = 13,
                    FirstName = "Josipa",
                    LastName = "Jopic",
                    EMail = "josipajopic@gmail.com",
                    Username = "josipa"
                }, "josipinasifra");

                userService.Create(new User
                {
                    Id = 14,
                    FirstName = "Ante",
                    LastName = "Antic",
                    EMail = "anteantic@gmail.com",
                    Username = "ante"
                }, "antinasifra");
            }

            if (!context.Boards.Any())
            {
                var boards = new List<Board>
                {
                    new Board
                    {
                        Id = 1,
                        TeamId = 1,
                        Name = "Agile App",
                        Image = "https://wallpaperplay.com/walls/full/0/2/2/82794.jpg",
                        Description ="Developing Agile application. Used by business analysts for taking care of project management."
                    },
                    new Board
                    {
                        Id = 2,
                        TeamId = 2,
                        Name = "RP2 Project",
                        Image = "https://www.elsetge.cat/myimg/f/147-1475661_download-parchment-paper-texture-picture-free-graph.jpg",
                        Description ="Developing project application for RP2 collegium on PMF."
                    },
                    new Board
                    {
                        Id = 3,
                        TeamId = 2,
                        Name = "RP3 Project",
                        Image = "https://i.pinimg.com/originals/e1/09/2d/e1092db6cd8fe8650e9dfe93719736a6.jpg",
                        Description ="Used by PMF students and professors."
                    },
                    new Board
                    {
                        Id = 4,
                        TeamId = 3,
                        Name = "Java App",
                        Image = "https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&w=1000&q=80",
                        Description ="FER application developed in Java"
                    },
                    new Board
                    {
                        Id = 5,
                        TeamId = 4,
                        Name = "AVL App",
                        Image = "https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&w=1000&q=80",
                        Description ="Application developed in AVL team"
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
                            Description = "Login for Agile, with signup included",
                            DueDate = new System.DateTime(2020, 1, 12)
                        },
                        new Card
                        {
                            Id = 2,
                            AssigneId = 1,
                            ListId = 1,
                            Title = "Create Home Page",
                            Description = "Home Page for Agile, with sidebar and topbar",
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
                            DateCreated = new System.DateTime(2020, 1, 12)
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
                            Name = "Agile team"
                        },
                        new Team
                        {
                            Id = 2,
                            AuthorId = 9,
                            Name = "PMF guys"
                        },
                        new Team
                        {
                            Id = 3,
                            AuthorId = 10,
                            Name = "FER devs"
                        },
                        new Team
                        {
                            Id = 4,
                            AuthorId = 14,
                            Name = "AVL team"
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
                            TeamId = 1
                        },
                        new TeamUserMapping
                        {
                            Id = 5,
                            UserId = 5,
                            TeamId = 1
                        },
                        new TeamUserMapping
                        {
                            Id = 6,
                            UserId = 6,
                            TeamId = 1
                        },
                        new TeamUserMapping
                        {
                            Id = 7,
                            UserId = 7,
                            TeamId = 1
                        },
                        new TeamUserMapping
                        {
                            Id = 8,
                            UserId = 8,
                            TeamId = 1
                        },
                        new TeamUserMapping
                        {
                            Id = 9,
                            UserId = 1,
                            TeamId = 2
                        },
                        new TeamUserMapping
                        {
                            Id = 10,
                            UserId = 5,
                            TeamId = 2
                        },
                        new TeamUserMapping
                        {
                            Id = 11,
                            UserId = 6,
                            TeamId = 2
                        },
                        new TeamUserMapping
                        {
                            Id = 12,
                            UserId = 7,
                            TeamId = 2
                        },
                        new TeamUserMapping
                        {
                            Id = 13,
                            UserId = 9,
                            TeamId = 2
                        },
                        new TeamUserMapping
                        {
                            Id = 14,
                            UserId = 10,
                            TeamId = 3
                        },
                        new TeamUserMapping
                        {
                            Id = 15,
                            UserId = 11,
                            TeamId = 3
                        },
                        new TeamUserMapping
                        {
                            Id = 16,
                            UserId = 12,
                            TeamId = 3
                        },
                        new TeamUserMapping
                        {
                            Id = 17,
                            UserId = 13,
                            TeamId = 3
                        },
                        new TeamUserMapping
                        {
                            Id = 18,
                            UserId = 1,
                            TeamId = 4
                        },
                        new TeamUserMapping
                        {
                            Id = 19,
                            UserId = 2,
                            TeamId = 4
                        },
                        new TeamUserMapping
                        {
                            Id = 20,
                            UserId = 14,
                            TeamId = 4
                        },
                        new TeamUserMapping
                        {
                            Id = 21,
                            UserId = 12,
                            TeamId = 4
                        }

                    };
                    context.AddRange(userTeamMappings);
                }

                context.SaveChanges();
        }
    }
}
