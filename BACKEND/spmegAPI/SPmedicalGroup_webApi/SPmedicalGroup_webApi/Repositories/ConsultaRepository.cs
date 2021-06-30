using Microsoft.EntityFrameworkCore;
using SPmedicalGroup_webApi.Contexts;
using SPmedicalGroup_webApi.Domains;
using SPmedicalGroup_webApi.Interfaces;
using SPmedicalGroup_webApi.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPmedicalGroup_webApi.Repositories
{
    /// <summary>
    /// Repositorio referente a consulta
    /// </summary>
    public class ConsultaRepository : IConsultaRepository
    {
        /// <summary>
        /// Objeto contexto por onde serão chamados os métodos do EF Core
        /// </summary>
        SPMGContext context = new SPMGContext();

        /// <summary>
        /// o ADIMINISTRADOR Cadastra uma nova consulta atraves dos seis parametros
        /// </summary>
        /// <param name="novaConsulta">uma nova consulta</param>
        public void Cadastrar(Consulta novaConsulta)
        {
            novaConsulta.IdSituacao = 3;

            context.Consultas.Add(novaConsulta);
            context.SaveChanges();

        }

        /// <summary>
        /// o  MEDICO altera a descrição da Consulta
        /// </summary>
        /// <param name="idConsulta">id da consulta que sera atualizada</param>
        /// <param name="novaDescricao">nova descricao</param>
        public void EditarDescricao(int idConsulta, DescricaoViewModel novaDescricao)
        {
            Consulta consultaBuscada = context.Consultas.FirstOrDefault(x => x.IdConsulta == idConsulta);

            if (novaDescricao.descricao != null)
            {
                consultaBuscada.Descricao = novaDescricao.descricao;
            }

            context.Consultas.Update(consultaBuscada);

            context.SaveChanges();


        }

        /// <summary>
        /// O ADM Lista todas as consultas cadastradas no banco
        /// </summary>
        /// <returns>Uma lista de consultas</returns>
        public List<Consulta> Listar()
        {     
                return context.Consultas.ToList();
        }


        /// <summary>
        /// Lista todas as consultas de um usuario 
        /// </summary>
        /// <param name="idUsuario">id do usuario que  sera buscado as consultas</param>
        /// <returns></returns>
        public List<Consulta> ListarUsuario(int idUsuario)
        {

            Paciente pacienteBuscado = context.Pacientes.FirstOrDefault(x => x.IdUsuario == idUsuario);
            Medico medicoBuscado = context.Medicos.FirstOrDefault(x => x.IdUsuario == idUsuario);

            if (pacienteBuscado != null)
            {
                return context.Consultas.Where(x => x.IdPaciente == pacienteBuscado.IdPaciente)

                    .Include(x => x.IdPacienteNavigation)
                    .Include(x => x.IdMedicoNavigation)
                    .Include(x => x.IdSituacaoNavigation)
                    .Include(x => x.IdMedicoNavigation.IdEspecialidadeNavigation)
                    .Select(x => new Consulta
                    {
                        IdConsulta = x.IdConsulta,
                        IdMedicoNavigation = x.IdMedicoNavigation,
                        IdPacienteNavigation = x.IdPacienteNavigation,
                        IdSituacaoNavigation = x.IdSituacaoNavigation,
                        Descricao = x.Descricao,
                        DataConsulta = x.DataConsulta,
                        HoraConsulta = x.HoraConsulta
                    })
                    .ToList();
            }

            if (medicoBuscado != null)
            {
                return context.Consultas.Include(x => x.IdMedicoNavigation).Where(x => x.IdMedico == medicoBuscado.IdMedico)
                    .Include(x => x.IdPacienteNavigation)
                    .Include(x => x.IdMedicoNavigation)
                    .Include(x => x.IdSituacaoNavigation)
                    .Include(x => x.IdMedicoNavigation.IdEspecialidadeNavigation)
                    .Select(x => new Consulta
                    {
                        IdConsulta = x.IdConsulta,
                        IdMedicoNavigation = x.IdMedicoNavigation,
                        IdPacienteNavigation = x.IdPacienteNavigation,
                        IdSituacaoNavigation = x.IdSituacaoNavigation,
                        Descricao = x.Descricao,
                        DataConsulta = x.DataConsulta,
                        HoraConsulta = x.HoraConsulta
                    })
                    .ToList();
            }

            return null;
        }
    }
}
