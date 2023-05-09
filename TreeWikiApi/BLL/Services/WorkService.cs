using BLL.Dto;
using BLL.Interfaces;
using DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BLL.Services
{
    public class WorkService : IWorkService
    {
        private readonly ICharacterService _characterService;
        private readonly IConnectionService _connectionService;
        private readonly IWorkRepository _workRepository;

        public WorkService(ICharacterService characterService, IConnectionService connectionService, IWorkRepository workRepository)
        {
            _characterService = characterService;
            _connectionService = connectionService;
            _workRepository = workRepository;
        }

        public IEnumerable<WorkDto> GetWorks()
        {
            return _workRepository.GetItems().Select(work => new WorkDto(work));
        }

        public WorkDto GetWork(Guid id)
        {
            var item = _workRepository.GetItems().FirstOrDefault(work => work.Id == id);
            if(item != null)
            {
                return new WorkDto(item);
            }

            return null;
        }

        public void AddWork(WorkDto work)
        {
            _workRepository.CreateItem(work.ToEntity());
        }

        public void DeleteWork(Guid id)
        {
            var work = this.GetWork(id);
            if (work != null)
            {
                string wwwroot = @"wwwroot\Images\";
                var characters = _characterService.GetCharacters(id).ToList();
                var connections = TestData.Connections.Where(c => c.Work == id).ToList();

                foreach (var connection in connections)
                {
                    _connectionService.RemoveConnection(connection.Id);
                }

                foreach (var character in characters)
                {
                    this._characterService.RemoveCharacter(character.Id);
                    if (character.ImageSrc != null)
                    {
                        this._characterService.DeleteCharacterImage(wwwroot + character.ImageSrc);
                    }

                    _characterService.RemoveCharacter(character.Id);
                }

                _workRepository.DeleteItem(work.ToEntity());
            }
        }
    }
}
