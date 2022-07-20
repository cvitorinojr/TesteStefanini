using AutoMapper;
using Domain.Dtos;
using Domain.Entities;

namespace CrossCutting.Mappings
{
    public class EntityToDtoProfile:Profile
    {
        public EntityToDtoProfile()
        {
            CreateMap<PessoaDto, Pessoa>()
                .ReverseMap();

            CreateMap<CidadeDto, Cidade>()
                .ReverseMap();

            CreateMap<CidadeDtoResult, Cidade>()
                .ReverseMap();

        }
    }
}
