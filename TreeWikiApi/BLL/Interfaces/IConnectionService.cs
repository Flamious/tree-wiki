using BLL.Dto;
using System.Collections.Generic;

namespace BLL.Interfaces
{
    public interface IConnectionService
    {
        public IEnumerable<ConnectionDto> GetConnections(string work);
        public ConnectionDto GetConnection(string id);
        public void UpdateConnection(string id, string newTitle);
        public void RemoveConnection(string id);
        public void RemoveConnectionsByCharacter(string characterId);
        public void AddConnection(ConnectionDto Connection);
    }
}
