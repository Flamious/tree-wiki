using BLL.Dto;
using System.Collections.Generic;

namespace BLL.Interfaces
{
    public interface ICharacterService
    {
        public IEnumerable<CharacterDto> GetCharacters(string work);
        public CharacterDto GetCharacter(string id);
        public string UpdateCharacter(string id, CharacterDto character);
        public string RemoveCharacter(string id);
        public CharacterDto ChangeCharacterPosition(string id, int x, int y);
        public void AddCharacter(CharacterDto Character);
        public void DeleteCharacterImage(string path);
    }
}
