using BLL.Dto;
using BLL.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace BLL.Services
{
    public class ConnectionService : IConnectionService
    {
        public void AddConnection(ConnectionDto connection)
        {
            TestData.Connections.Add(connection);
        }

        public ConnectionDto GetConnection(string id)
        {
            return TestData.Connections.FirstOrDefault(c => c.Id == id);
        }

        public IEnumerable<ConnectionDto> GetConnections()
        {
            return TestData.Connections;
        }

        public void RemoveConnection(string id)
        {
            var connection = this.GetConnection(id);
            if(connection != null)
            {
                TestData.Connections.Remove(connection);
            }
        }

        public void RemoveConnectionsByCharacter(string characterId)
        {
            var connections = this.GetConnections().Where(c => c.From == characterId || c.To == characterId).ToList();

            foreach(var c in connections)
            {
                TestData.Connections.Remove(c);
            }
        }
    }
}
