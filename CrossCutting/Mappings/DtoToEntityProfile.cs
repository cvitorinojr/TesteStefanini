using AutoMapper;
using Domain.Dtos;
using Domain.Entities;

namespace CrossCutting.Mappings
{
    public class DtoToEntityProfile:Profile
    {
        public DtoToEntityProfile()
        {
            CreateMap<Pessoa, PessoaDto>()
                .ReverseMap();
            
            CreateMap<Cidade, CidadeDto>()
                .ReverseMap();
        }
    }
}
