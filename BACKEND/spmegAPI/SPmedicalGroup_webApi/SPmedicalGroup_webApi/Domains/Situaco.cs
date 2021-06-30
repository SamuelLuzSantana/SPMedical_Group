﻿using System;
using System.Collections.Generic;

#nullable disable

namespace SPmedicalGroup_webApi.Domains
{
    public partial class Situaco
    {
        public Situaco()
        {
            Consulta = new HashSet<Consulta>();
        }

        public int IdSituacao { get; set; }
        public string Situacao { get; set; }

        public virtual ICollection<Consulta> Consulta { get; set; }
    }
}
