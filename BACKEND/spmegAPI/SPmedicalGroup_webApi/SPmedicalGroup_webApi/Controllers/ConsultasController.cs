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

        /// <summary>
        /// somento o ADMINISTRADOR Lista todas as consultas 
        /// </summary>
        /// <returns>uma lista com todas as consultas</returns>
        [Authorize(Roles = "1")] //Usuario do tipo administrador (id 1) esta autorizado 
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
        
        /// <summary>
        /// Paciente e medico lista suas consultas
        /// </summary>
        /// <param name="idUsuario">id do usuario que sera cadastrado</param>
        /// <returns>uma lista de usuarios</returns>
        [Authorize] //somente se o usuario estiver logado consiguira visualizar suas consultas
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

        /// <summary>
        /// Somente o usuario MEDICO atualiza a descrição de uma consulta
        /// </summary>
        /// <param name="IdConsulta">id da consulta que sera atualizado</param>
        /// <param name="descricaoAtualizada">nova descricao</param>
        /// <returns></returns>
        [Authorize(Roles = "2")]//somente o medico (id 2) esta autorizado a editar
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

        /// <summary>
        /// Cadastra uma nova consulta
        /// </summary>
        /// <param name="novaConsulta">parametros para cadastrar uma consulta</param>
        /// <returns>status code 201</returns>
        [Authorize(Roles = "1")]  //Usuario do tipo administrador (id 1) esta autorizado 
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
