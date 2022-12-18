using BLL.Dto;
using BLL.Interfaces;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace BLL.Services
{
    public class CharacterService : ICharacterService
    {
        public void AddCharacter(CharacterDto character)
        {
            TestData.Characters.Add(character);
        }

        public CharacterDto ChangeCharacterPosition(string id, int x, int y)
        {
            var character = this.GetCharacter(id);
            if (character != null)
            {
                character.X = x;
                character.Y = y;
            }

            return character;
        }

        public void DeleteCharacterImage(string path)
        {
            if(File.Exists(path))
            {
                File.Delete(path);
            };
        }

        public CharacterDto GetCharacter(string id)
        {
            return TestData.Characters.FirstOrDefault(c => c.Id == id);
        }

        public IEnumerable<CharacterDto> GetCharacters()
        {
            return TestData.Characters;
        }

        public string RemoveCharacter(string id)
        {
            var character = this.GetCharacter(id);
            string oldImagePath = null;

            if (character != null)
            {
                oldImagePath = character.ImageSrc;
                TestData.Characters.Remove(character);
            }

            return oldImagePath;
        }

        public string UpdateCharacter(string id, CharacterDto newCharacter)
        {
            var character = this.GetCharacter(id);
            string oldImagePath = null;

            if (character != null)
            {
                oldImagePath = character.ImageSrc;
                character.Update(newCharacter);
            }

            return oldImagePath;
        }
    }
}
