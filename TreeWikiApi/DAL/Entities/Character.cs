using System;
using System.Collections.Generic;

namespace DAL.Entities
{
    public class Character
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string ImageSrc { get; set; }

        public string Nickname { get; set; }

        public string Description { get; set; }

        public string ShortDescription { get; set; }

        public int X { get; set; }

        public int Y { get; set; }

        public Guid WorkId { get; set; }
    }
}
