using DAL.Entities;
using DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace DAL.Repositories
{
    public class ConnectionRepository : BaseRepository, IConnectionRepository
    {
        public ConnectionRepository(string connectionString, IDatabaseContextFactory contextFactory)
            : base(connectionString, contextFactory)
        {
        }

        public Connection CreateItem(Connection connection)
        {
            var entity = this.Context.Add(connection);
            this.Context.SaveChanges();
            return entity.Entity;
        }

        public IQueryable<Connection> GetItems()
        {
            return this.Context.Connections.AsNoTracking();
        }

        public Connection GetItem(Guid id)
        {
            var Connection = this.Context.Connections
                .FirstOrDefault(c => c.Id == id);

            return Connection;
        }

        public int DeleteItem(Connection connection)
        {
            this.Context.Connections.Remove(connection);
            return this.Context.SaveChanges();
        }

        public Connection UpdateItem(Connection connection)
        {
            var entity = this.Context.Connections.Update(connection);
            this.Context.SaveChanges();
            return entity.Entity;
        }
    }
}
