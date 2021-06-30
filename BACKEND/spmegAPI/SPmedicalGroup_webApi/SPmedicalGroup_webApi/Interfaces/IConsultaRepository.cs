using SPmedicalGroup_webApi.Domains;
using SPmedicalGroup_webApi.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPmedicalGroup_webApi.Interfaces
{
    interface IConsultaRepository
    {
        /// <summary>
        /// Lista todas as consultas
        /// </summary>
        /// <returns>Uma lista de todas as consultas</returns>
        List<Consulta> Listar();

        /// <summary>
        /// Cadastra uma nova consulta 
        /// </summary>
        /// <param name="novaConsulta">As informações da nova consultas</param>
        void Cadastrar(Consulta novaConsulta);

        /// <summary>
        /// Lista todas as consultas de um Usuario
        /// </summary>
        /// <returns>Uma lista de todas as consultas de um Usuario</returns>
        List<Consulta> ListarUsuario(int idUsuario);

        /// <summary>
        /// Edita uma descricao de uma consulta ja cadastrada
        /// </summary>
        /// <param name="idConsulta"> id da consulta que sera atualizada</param>
        /// <param name="novaDescricao">nova descrição da consulta</param>
        void EditarDescricao(int idConsulta, DescricaoViewModel novaDescricao);
    }
}
