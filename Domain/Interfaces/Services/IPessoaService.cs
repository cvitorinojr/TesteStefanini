using Domain.Dtos;
using Domain.Entities;

namespace Domain.Interfaces.Services
{
    public interface IPessoaService
    {
        Task<PessoaDtoResult> Get(int id);
        Task<IEnumerable<PessoaDtoResult>> GetAll();
        Task<PessoaDto> Post(PessoaDto psy);
        Task<PessoaDto> Put(PessoaDto psy, int id);
        Task<bool> Delete(int id);
    }
}
