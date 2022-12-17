using BLL.Dto;
using System.Collections.Generic;

namespace BLL.Interfaces
{
    public interface ICharacterService
    {
        public IEnumerable<CharacterDto> GetCharacters();
        public CharacterDto GetCharacter(string id);
        public void RemoveCharacter(string id);
        public CharacterDto ChangeCharacterPosition(string id, int x, int y);
        public void AddCharacter(CharacterDto Character);
    }
}
