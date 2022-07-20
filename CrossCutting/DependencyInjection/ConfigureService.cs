using Domain.Interfaces.Services;
using Microsoft.Extensions.DependencyInjection;
using Service;

namespace Api.CrossCutting.DependencyInjection
{
    public class ConfigureService
    {
        public static void ConfigureDependenciesService(IServiceCollection serviceCollection)
        {
            serviceCollection.AddTransient<IPessoaService, PessoaService>();
            serviceCollection.AddTransient<ICidadeService, CidadeService>();
        }
    }
}
