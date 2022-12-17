using System;

namespace BLL.Dto
{
    public class ConnectionDto
    {
        public string Id { get; } = Guid.NewGuid().ToString();
        public string From { get; set; }
        public string To { get; set; }
        public string Title { get; set; }
    }
}
