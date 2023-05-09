using BLL.Dto;
using System;
using System.Collections.Generic;

namespace BLL
{
    public static class TestData
    {
        public static List<WorkDto> Works { get; set; } = new List<WorkDto>();
        public static List<CharacterDto> Characters { get; set; } = new List<CharacterDto>();
        public static List<ConnectionDto> Connections { get; set; } = new List<ConnectionDto>();

    }
}
