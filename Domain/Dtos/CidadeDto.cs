using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dtos
{
    public class CidadeDto
    {
        [Required]
        public string Nome { get; set; }

        [Required]
        [MaxLength(2)]
        public string UF { get; set; }
    }
}
