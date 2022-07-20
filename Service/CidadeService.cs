using AutoMapper;
using Domain.Dtos;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class CidadeService : ICidadeService
    {
        private IRepository<Cidade> _repository;
        private readonly IMapper _mapper;
        public CidadeService(IRepository<Cidade> Repository, IMapper mapper)
        {
            _repository = Repository;
            _mapper = mapper;
        }

        public async Task<bool> Delete(int id)
        {
            return await _repository.DeleteAsync(id);
        }

        public async Task<CidadeDtoResult> Get(int id)
        {
            var result = await _repository.SelectAsync(id);

            return _mapper.Map<CidadeDtoResult>(result);
        }

        public async Task<IEnumerable<CidadeDtoResult>> GetAll()
        {
            var result = await _repository.SelectAsync();

            return _mapper.Map<List<CidadeDtoResult>>(result);
        }

        public async Task<CidadeDto> Post(CidadeDto cidade)
        {

            var entity = _mapper.Map<Cidade>(cidade);
            var result = await _repository.InsertAsync(entity);

            return _mapper.Map<CidadeDto>(result);
        }

        public async Task<CidadeDto> Put(CidadeDto cidade)
        {

            var entity = _mapper.Map<Cidade>(cidade);
            var result = await _repository.UpdateAsync(entity);

            return _mapper.Map<CidadeDto>(result);
        }
    }
}
