using DAL.Entities;
using System;

namespace DAL.Interfaces
{
    public interface ICharacterRepository : IRepository<Character, Guid>
    {
    }
}
