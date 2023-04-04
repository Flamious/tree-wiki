using System;

namespace BLL.Dto
{
    public class WorkDto
    {
        public string Id { get; } = Guid.NewGuid().ToString();
        public string Title { get; set; }
        public string Next { get; set; } = null;
        public string Previous{ get; set; } = null;
    }
}
