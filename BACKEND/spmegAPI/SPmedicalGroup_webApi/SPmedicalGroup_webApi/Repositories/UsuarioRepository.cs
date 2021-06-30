using SPmedicalGroup_webApi.Contexts;
using SPmedicalGroup_webApi.Domains;
using SPmedicalGroup_webApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPmedicalGroup_webApi.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        SPMGContext context = new SPMGContext();


        /// <summary>
        /// Valida o usuário
        /// </summary>
        /// <param name="email">e-mail do usuário</param>
        /// <param name="senha">senha do usuário</param>
        /// <returns>Um objeto do tipo Usuario que foi buscado</returns>
        public Usuario Login(string email, string senha)
        {
            // Retorna o usuário encontrado através do e-mail e da senha
            return context.Usuarios.FirstOrDefault(u => u.Email == email && u.Senha == senha);
        }
    }
}
