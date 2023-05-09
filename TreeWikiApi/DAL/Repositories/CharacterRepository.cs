using DAL.Entities;
using DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace DAL.Repositories
{
    public class CharacterRepository : BaseRepository, ICharacterRepository
    {
        public CharacterRepository(string connectionString, IDatabaseContextFactory contextFactory)
            : base(connectionString, contextFactory)
        {
        }

        public Character CreateItem(Character character)
        {
            var entity = this.Context.Add(character);
            this.Context.SaveChanges();
            return entity.Entity;
        }

        public IQueryable<Character> GetItems()
        {
            return this.Context.Characters.AsNoTracking();
        }

        public Character GetItem(Guid id)
        {
            var Character = this.Context.Characters
                .FirstOrDefault(c => c.Id == id);

            return Character;
        }

        public int DeleteItem(Character character)
        {
            this.Context.Characters.Remove(character);
            return this.Context.SaveChanges();
        }

        public Character UpdateItem(Character character)
        {
            var entity = this.Context.Characters.Update(character);
            this.Context.SaveChanges();
            return entity.Entity;
        }
    }
}
