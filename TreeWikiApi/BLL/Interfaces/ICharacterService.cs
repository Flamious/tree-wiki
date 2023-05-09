using BLL.Dto;
using System;
using System.Collections.Generic;

namespace BLL.Interfaces
{
    public interface ICharacterService
    {
        public IEnumerable<CharacterDto> GetCharacters(Guid work);
        public CharacterDto GetCharacter(Guid id);
        public string UpdateCharacter(Guid id, CharacterDto character);
        public string RemoveCharacter(Guid id);
        public CharacterDto ChangeCharacterPosition(Guid id, int x, int y);
        public void AddCharacter(CharacterDto Character);
        public void DeleteCharacterImage(string path);
    }
}
