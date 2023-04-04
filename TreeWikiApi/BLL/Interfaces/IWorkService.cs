using BLL.Dto;
using System.Collections.Generic;

namespace BLL.Interfaces
{
    public interface IWorkService
    {
        public IEnumerable<WorkDto> GetWorks();
    }
}
