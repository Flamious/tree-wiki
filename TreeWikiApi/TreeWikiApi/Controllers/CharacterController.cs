using BLL.Dto;
using BLL.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace TreeWikiApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CharacterController : ControllerBase
    {
        private readonly ILogger<CharacterController> _logger;
        private readonly ICharacterService _characterService;
        private readonly IConnectionService _connectionService;

        public CharacterController(ILogger<CharacterController> logger, ICharacterService characterService, IConnectionService connectionService)
        {
            _characterService = characterService;
            _connectionService = connectionService;
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<CharacterDto> GetCharacters()
        {
            return this._characterService.GetCharacters();
        }

        [HttpPost]
        public async Task<IEnumerable<CharacterDto>> AddCharacter([FromForm] NewCharacterDto character)
        {
            string fileName = $"{DateTime.Now.ToString("dd.MM.yyyy.HH.mm.ss")}-{character.ImageFile.FileName}";
            string path = @"wwwroot\Images\" + fileName;

            using (var fileStream = new FileStream(path, FileMode.CreateNew))
            {
                await character.ImageFile.CopyToAsync(fileStream);
            }

            this._characterService.AddCharacter(new CharacterDto()
            {
                Name = character.Name,
                ShortDescription = character.ShortDescription,
                X = character.X,
                Y = character.Y,
                ImageSrc = fileName
            });

            return this._characterService.GetCharacters();
        }

        [HttpDelete]
        [Route("{id}")]
        public IEnumerable<CharacterDto> DeleteCharacter([FromRoute] string id)
        {
            string wwwroot = @"wwwroot\Images\";
            this._connectionService.RemoveConnectionsByCharacter(id);
            string oldImagePath = this._characterService.RemoveCharacter(id);

            if (oldImagePath != null)
            {
                this._characterService.DeleteCharacterImage(wwwroot + oldImagePath);
            }

            return this._characterService.GetCharacters();
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IEnumerable<CharacterDto>> UpdateCharacter([FromRoute] string id, [FromForm] NewCharacterDto character)
        {
            string fileName = $"{DateTime.Now.ToString("dd.MM.yyyy.HH.mm.ss")}-{character.ImageFile.FileName}";
            string wwwroot = @"wwwroot\Images\";
            string path = wwwroot + fileName;

            using (var fileStream = new FileStream(path, FileMode.CreateNew))
            {
                await character.ImageFile.CopyToAsync(fileStream);
            }

            string oldImagePath = this._characterService.UpdateCharacter(id, new CharacterDto()
            {
                Name = character.Name,
                ShortDescription = character.ShortDescription,
                X = character.X,
                Y = character.Y,
                ImageSrc = fileName
            });

            if(oldImagePath != null)
            {
                this._characterService.DeleteCharacterImage(wwwroot + oldImagePath);
            }

            return this._characterService.GetCharacters();
        }

        [HttpPut]
        [Route("{id}/position")]
        public CharacterDto ChangePosition([FromRoute] string id, [FromQuery] int x, [FromQuery] int y)
        {
            return this._characterService.ChangeCharacterPosition(id, x, y);
        }

        public class NewCharacterDto
        {
            public IFormFile ImageFile { get; set; }
            public string Name { get; set; }
            public string ShortDescription { get; set; }
            public int X { get; set; }
            public int Y { get; set; }
        }
    }
}
