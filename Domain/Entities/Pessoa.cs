using Domain.Entities.BaseEntities;

namespace Domain.Entities
{
    public class Pessoa : BaseEntity
    {
        public string Nome { get; set; }
        public string CPF { get; set; }
        public int Idade { get; set; }
        public int CidadeId { get; set; }
        public virtual Cidade Cidade { get; set; }
    }
}
