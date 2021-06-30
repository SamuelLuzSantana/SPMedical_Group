using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SPmedicalGroup_webApi.Domains;
using SPmedicalGroup_webApi.Interfaces;
using SPmedicalGroup_webApi.Repositories;
using SPmedicalGroup_webApi.ViewModel;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace SPmedicalGroup_webApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]

    public class ConsultasController : ControllerBase
    {
        private IConsultaRepository _consulta { get; set; }

        public ConsultasController()
        {
            _consulta = new ConsultaRepository();
        }

        [Authorize(Roles = "1")] 
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_consulta.Listar());
            }

            catch (Exception error)
            {
                return BadRequest(error);
            }

        }
        
        [Authorize]
        [HttpGet("minhasConsultas")]
        public IActionResult GetMy(int idUsuario)
        {
            try
            {
                idUsuario = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);
                return Ok(_consulta.ListarUsuario(idUsuario));
            }

            catch (Exception error)
            {
                return BadRequest(error);
              
            }
        }

        [Authorize(Roles = "2")]
        [HttpPatch("{IdConsulta}")]
        public IActionResult PatchDesc(int IdConsulta, DescricaoViewModel descricaoAtualizada)
        {
            try
            {
                _consulta.EditarDescricao(IdConsulta, descricaoAtualizada);

                return StatusCode(204);
            }

            catch (Exception error)
            {
                return BadRequest(error);       
            }

        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public IActionResult Post(Consulta novaConsulta)
        {
            try
            {
                _consulta.Cadastrar(novaConsulta);
                return StatusCode(201);
            }

            catch (Exception error)
            {

                return BadRequest(error);
            }
        }
        

    }
}
