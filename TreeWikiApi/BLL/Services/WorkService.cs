using BLL.Dto;
using BLL.Interfaces;
using System.Collections.Generic;

namespace BLL.Services
{
    public class WorkService : IWorkService
    {
        public IEnumerable<WorkDto> GetWorks()
        {
            return TestData.Works;
        }
    }
}
