using BLL.Dto;
using System;
using System.Collections.Generic;

namespace BLL
{
    public static class TestData
    {
        public static List<WorkDto> Works { get; set; }
        public static List<CharacterDto> Characters { get; set; }
        public static List<ConnectionDto> Connections { get; set; }

        static TestData()
        {
            Works = new List<WorkDto>()
            {
                new WorkDto()
                {
                    Title = "День 1",
                },
                new WorkDto()
                {
                    Title = "День 2",
                },
                new WorkDto()
                {
                    Title = "День 3",
                },
            };
            Characters = new List<CharacterDto>();
            Connections = new List<ConnectionDto>();

            foreach (var w in Works)
            {
                Characters.Add(new CharacterDto()
                {
                    Name = "Гаррье Дюбуа",
                    ShortDescription = "Также известен как Гарри, Текила Сансет и Рафаэль Амброзиус Кусто (ориг. Harrier \"Harry\" Du Bois) — главный герой игры Disco Elysium.",
                    ImageSrc = "Harry.webp",
                    X = 2550,
                    Y = 2550,
                    Work = w.Id
                }); 
                Characters.Add(new CharacterDto()
                {
                    Name = "Ким Кицураги",
                    ShortDescription = "Персонаж в игре Disco Elysium. Является лейтенантом в участке 57 и напарником Гарри в деле Повешенного.",
                    ImageSrc = "Kim.webp",
                    X = 2550,
                    Y = 2650,
                    Work = w.Id
                });

                Connections.Add(new ConnectionDto()
                {
                    From = Characters[0].Id,
                    To = Characters[1].Id,
                    Title = "Напарник",
                    Work = w.Id
                });
                Connections.Add(new ConnectionDto()
                {
                    From = Characters[1].Id,
                    To = Characters[0].Id,
                    Title = "Напарник",
                    Work = w.Id
                });

                if (w.Title != "День 1")
                {
                    Characters.Add(new CharacterDto()
                    {
                        Name = "Куно",
                        ShortDescription = "Кууно де Рюйтер, более известный как Куно (ориг. Kuuno de Ruyter/Cuno) – персонаж в Disco Elysium. На момент действия игры мальчику 12 лет.",
                        ImageSrc = "Cuno.webp",
                        X = 2650,
                        Y = 2650,
                        Work = w.Id
                    });

                    Connections.Add(new ConnectionDto()
                    {
                        From = Characters[1].Id,
                        To = Characters[3].Id,
                        Title = "Раздражитель",
                        Work = w.Id
                    });
                }

                if(w.Title == "День 3")
                {
                    Characters.Add(new CharacterDto()
                    {
                        Name = "Клаасье",
                        ShortDescription = "Клаасье (ориг. Klaasje) — персонаж в игре Disco Elysium.",
                        ImageSrc = "Klaasje.webp",
                        X = 2650,
                        Y = 2550,
                        Work = w.Id
                    });

                }
            }
        }

    }
}
