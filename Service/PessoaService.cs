using AutoMapper;
using Data.Context;
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
    public class PessoaService : IPessoaService
    {
        private IRepository<Pessoa> _repository;
        private IRepository<Cidade> _cidadeRepository;
        private readonly IMapper _mapper;
        public PessoaService(IRepository<Pessoa> Repository, IRepository<Cidade> CidadeRepository, IMapper mapper)
        {
            _repository = Repository;
            _cidadeRepository = CidadeRepository;
            _mapper = mapper;
        }
        

        public async Task<bool> Delete(int id)
        {
            return await _repository.DeleteAsync(id);
        }

        public async Task<PessoaDtoResult> Get(int id)
        {
            var pessoa = await _repository.SelectAsync(id);
            var cidade = await _cidadeRepository.SelectAsync(pessoa.CidadeId);

            PessoaDtoResult pessoaResult = new PessoaDtoResult();

            pessoaResult.Id = pessoa.Id;
            pessoaResult.Nome = pessoa.Nome;
            pessoaResult.CPF = pessoa.CPF;
            pessoaResult.Idade = pessoa.Idade;
            
            pessoaResult.Cidade = cidade.Nome;
            pessoaResult.Uf = cidade.UF;

            return pessoaResult;
        }

        public async Task<IEnumerable<PessoaDtoResult>> GetAll()
        {
            
            var pessoas = await _repository.SelectAsync();
            var cidades = await _cidadeRepository.SelectAsync();

            List<PessoaDtoResult> pessoasResult = new List<PessoaDtoResult>();

            foreach(var pessoa in pessoas)
            {
                pessoasResult.Add(new PessoaDtoResult() { 
                Id = pessoa.Id,
                Nome = pessoa.Nome,
                CPF = pessoa.CPF,
                Idade = pessoa.Idade,

                Cidade = cidades.FirstOrDefault(x => x.Id == pessoa.CidadeId).Nome,
                Uf = cidades.FirstOrDefault(x => x.Id == pessoa.CidadeId).UF
                });;
            }

            return pessoasResult;
        }

        public async Task<PessoaDto> Post(PessoaDto pessoa)
        {
            if (!(await _cidadeRepository.ExistAsync(pessoa.CidadeId)))
                throw new ArgumentException("Cidade não cadastrada");

           var entity = _mapper.Map<Pessoa>(pessoa);
           var result = await _repository.InsertAsync(entity);

           return _mapper.Map<PessoaDto>(result);

        }

        public async Task<PessoaDto> Put(PessoaDto pessoa, int id)
        {
            if (!(await _cidadeRepository.ExistAsync(pessoa.CidadeId)))
                throw new ArgumentException("Cidade não cadastrada");

            var entity = _mapper.Map<Pessoa>(pessoa);
            entity.Id = id;
            var result = await _repository.UpdateAsync(entity);

            return _mapper.Map<PessoaDto>(result);
        }
    }
}
