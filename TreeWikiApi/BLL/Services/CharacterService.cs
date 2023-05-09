using BLL.Dto;
using BLL.Interfaces;
using DAL.Interfaces;
using DAL.Repositories;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace BLL.Services
{
    public class CharacterService : ICharacterService
    {
        private readonly ICharacterRepository _characterRepository;

        public CharacterService(ICharacterRepository characterRepository)
        {
            _characterRepository = characterRepository;
        }

        public void AddCharacter(CharacterDto character)
        {
            _characterRepository.CreateItem(character.ToEntity());
        }

        public CharacterDto ChangeCharacterPosition(Guid id, int x, int y)
        {
            var character = this.GetCharacter(id);
            if(character == null)
            {
                return null;
            }

            character.X = x;
            character.Y = y;

            var result = _characterRepository.UpdateItem(character.ToEntity());
            return new CharacterDto(result);
        }

        public void DeleteCharacterImage(string path)
        {
            if (File.Exists(path))
            {
                File.Delete(path);
            };
        }

        public CharacterDto GetCharacter(Guid id)
        {
            var item = _characterRepository.GetItems().FirstOrDefault(character => character.Id == id);
            if (item != null)
            {
                return new CharacterDto(item);
            }

            return null;
        }

        public IEnumerable<CharacterDto> GetCharacters(Guid work)
        {
            return _characterRepository.GetItems().Where(character => character.WorkId == work).Select(character => new CharacterDto(character));
        }

        public string RemoveCharacter(Guid id)
        {
            var character = this.GetCharacter(id);
            string oldImagePath = null;

            if (character != null)
            {
                oldImagePath = character.ImageSrc;
                _characterRepository.DeleteItem(character.ToEntity());
            }

            return oldImagePath;
        }

        public string UpdateCharacter(Guid id, CharacterDto newCharacter)
        {
            var character = this.GetCharacter(id);
            string oldImagePath = null;

            if (character != null)
            {
                oldImagePath = character.ImageSrc;
                _characterRepository.UpdateItem(character.ToEntity());
            }

            return oldImagePath;
        }
    }
}
