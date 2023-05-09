using DAL.Entities;
using System;

namespace DAL.Interfaces
{
    public interface IConnectionRepository : IRepository<Connection, Guid>
    {
    }
}
