using System;

namespace BLL.Dto
{
    public class CharacterDto
    {
        public string Id { get; } = Guid.NewGuid().ToString();
        public string Name { get; set; }
        public string ImageSrc { get; set; }
        public string Nickname { get; set; }
        public string Description { get; set; }
        public string ShortDescription { get; set; }
        public string Work { get; set; }
        public int X { get; set; }
        public int Y { get; set; }

        public void Update(CharacterDto character)
        {
            this.Name = character.Name;
            this.ImageSrc = character.ImageSrc;
            this.Nickname = character.Nickname;
            this.Description = character.Description;
            this.ShortDescription = character.ShortDescription;
        }
    }
}
