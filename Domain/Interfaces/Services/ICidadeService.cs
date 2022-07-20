using Domain.Dtos;
using Domain.Entities;

namespace Domain.Interfaces.Services
{
    public interface ICidadeService
    {
        Task<CidadeDtoResult> Get(int id);
        Task<IEnumerable<CidadeDtoResult>> GetAll();
        Task<CidadeDto> Post(CidadeDto psy);
        Task<CidadeDto> Put(CidadeDto psy);
        Task<bool> Delete(int id);
    }
}
