using MyApp.ServiceInterface;
using ServiceStack.NativeTypes.TypeScript;

[assembly: HostingStartup(typeof(MyApp.AppHost))]

namespace MyApp;

public class AppHost() : AppHostBase("MyApp"), IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices((context, services) => {
            // Configure ASP.NET Core IOC Dependencies
            services.AddSingleton(new AppConfig {
                AppBaseUrl = context.HostingEnvironment.IsDevelopment()
                    ? "https://localhost:5173"  
                    : null,
                ApiBaseUrl = context.HostingEnvironment.IsDevelopment()
                    ? "https://localhost:5001"  
                    : null,
            });
        });

    // Configure your AppHost with the necessary configuration and dependencies your App needs
    public override void Configure()
    {
        SetConfig(new HostConfig {
        });

        TypeScriptGenerator.InsertTsNoCheck = true;
    }
    
    // TODO: Replace with your own License Key. FREE Individual or OSS License available from: https://servicestack.net/free
    public static void RegisterKey() =>
        Licensing.RegisterLicense("OSS BSD-3-Clause 2025 https://github.com/NetCoreTemplates/vue-spa HTWKFlxRIx47O3orfCGNfuC7F8vIxBVBYcvxhwlNvdApp2fWkhjUZ4JNo/v3g7Zv4hzBpNpcrtvz6s+eDPYP6kZaDh3eDf3gOgxbCPqlIf+SZFWAeRNeE1fpplw7gaWADHHcMCDFcJv+6TzxQIDO7WZvdH8deeJONpbHgZgJFgc=");
}
