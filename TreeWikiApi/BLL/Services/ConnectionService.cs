using BLL.Dto;
using BLL.Interfaces;
using DAL.Interfaces;
using DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BLL.Services
{
    public class ConnectionService : IConnectionService
    {
        private readonly IConnectionRepository _connectionRepository;

        public ConnectionService(IConnectionRepository connectionRepository)
        {
            _connectionRepository = connectionRepository;
        }

        public void AddConnection(ConnectionDto connection)
        {
            _connectionRepository.CreateItem(connection.ToEntity());
        }

        public ConnectionDto GetConnection(Guid id)
        {
            var item = _connectionRepository.GetItems().FirstOrDefault(character => character.Id == id);
            if (item != null)
            {
                return new ConnectionDto(item);
            }

            return null;
        }

        public IEnumerable<ConnectionDto> GetConnections(Guid work)
        {
            return _connectionRepository.GetItems().Select(connection => new ConnectionDto(connection));
        }

        public void RemoveConnection(Guid id)
        {
            var connection = this.GetConnection(id);

            if (connection != null)
            {
                _connectionRepository.DeleteItem(connection.ToEntity());
            }
        }

        public void RemoveConnectionsByCharacter(Guid characterId)
        {
            var connections = _connectionRepository.GetItems().Where(c => c.From == characterId || c.To == characterId).ToList();

            foreach(var c in connections)
            {
                this.RemoveConnection(c.Id);
            }
        }

        public ConnectionDto UpdateConnection(Guid id, string newTitle)
        {
            var connection = this.GetConnection(id);
            if (connection == null)
            {
                return null;
            }

            connection.Title = newTitle;

            var result = _connectionRepository.UpdateItem(connection.ToEntity());
            return new ConnectionDto(result);
        }
    }
}
