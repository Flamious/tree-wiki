using DAL.Entities;
using System;

namespace BLL.Dto
{
    public class CharacterDto
    {
        public CharacterDto() { }
        public CharacterDto(Character character)
        {
            this.Id = character.Id;
            this.Name = character.Name;
            this.ImageSrc = character.ImageSrc;
            this.Nickname = character.Nickname;
            this.Description = character.Description;
            this.ShortDescription = character.ShortDescription;
            this.Work = character.WorkId;
            this.X = character.X;
            this.Y = character.Y;
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string ImageSrc { get; set; }
        public string Nickname { get; set; }
        public string Description { get; set; }
        public string ShortDescription { get; set; }
        public Guid Work { get; set; }
        public int X { get; set; }
        public int Y { get; set; }

        public Character ToEntity()
        {
            return new Character
            {
                Id = this.Id,
                Name = this.Name,
                ImageSrc = this.ImageSrc,
                Nickname = this.Nickname,
                Description = this.Description,
                ShortDescription = this.ShortDescription,
                WorkId = this.Work,
                X = this.X,
                Y = this.Y
            };
        }
    }
}
