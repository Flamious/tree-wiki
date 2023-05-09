using BLL.Dto;
using System;
using System.Collections.Generic;

namespace BLL.Interfaces
{
    public interface IConnectionService
    {
        public IEnumerable<ConnectionDto> GetConnections(Guid work);
        public ConnectionDto GetConnection(Guid id);
        public ConnectionDto UpdateConnection(Guid id, string newTitle);
        public void RemoveConnection(Guid id);
        public void RemoveConnectionsByCharacter(Guid characterId);
        public void AddConnection(ConnectionDto Connection);
    }
}
