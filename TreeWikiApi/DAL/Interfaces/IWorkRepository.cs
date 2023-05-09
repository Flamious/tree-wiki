using DAL.Entities;
using System;

namespace DAL.Interfaces
{
    public interface IWorkRepository : IRepository<Work, Guid>
    {
    }
}
