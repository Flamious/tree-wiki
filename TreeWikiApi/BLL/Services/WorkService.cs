using BLL.Dto;
using BLL.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace BLL.Services
{
    public class WorkService : IWorkService
    {
        private readonly ICharacterService _characterService;
        private readonly IConnectionService _connectionService;

        public WorkService(ICharacterService characterService, IConnectionService connectionService)
        {
            _characterService = characterService;
            _connectionService = connectionService;
        }

        public IEnumerable<WorkDto> GetWorks()
        {
            return TestData.Works;
        }

        public WorkDto GetWork(string id)
        {
            return TestData.Works.FirstOrDefault(c => c.Id == id);
        }

        public void AddWork(WorkDto work)
        {
            TestData.Works.Add(work);
        }

        public void DeleteWork(string id)
        {
            var work = this.GetWork(id);
            if (work != null)
            {
                string wwwroot = @"wwwroot\Images\";
                var characters = TestData.Characters.Where(c => c.Work == id).ToList();
                var connections = TestData.Connections.Where(c => c.Work == id).ToList();

                foreach (var connection in connections)
                {
                    _connectionService.RemoveConnection(connection.Id);
                }

                foreach (var character in characters)
                {
                    this._characterService.RemoveCharacter(id);
                    if (character.ImageSrc != null)
                    {
                        this._characterService.DeleteCharacterImage(wwwroot + character.ImageSrc);
                    }

                    _characterService.RemoveCharacter(character.Id);
                }

                TestData.Works.Remove(work);
            }
        }
    }
}
