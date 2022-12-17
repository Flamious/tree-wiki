using BLL.Dto;
using BLL.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace BLL.Services
{
    public class CharacterService : ICharacterService
    {
        public void AddCharacter(CharacterDto character)
        {
            TestData.Characters.Add(character);
        }

        public CharacterDto GetCharacter(string id)
        {
            return TestData.Characters.FirstOrDefault(c => c.Id == id);
        }

        public IEnumerable<CharacterDto> GetCharacters()
        {
            return TestData.Characters;
        }

        public void RemoveCharacter(string id)
        {
            var character = this.GetCharacter(id);
            if (character != null)
            {
                TestData.Characters.Remove(character);
            }
        }
    }
}
