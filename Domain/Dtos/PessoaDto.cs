using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dtos
{
    public class PessoaDto
    {
        [Required]
        public string Nome { get; set; }

        [Required]
        [MaxLength(12)]
        public string CPF { get; set; }
        public int Idade { get; set; }
        public int CidadeId { get; set; }
    }
}
