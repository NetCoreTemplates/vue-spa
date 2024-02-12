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
        Licensing.RegisterLicense("OSS BSD-3-Clause 2024 https://github.com/NetCoreTemplates/vue-spa TT76agO8eEwZcyhauXTD7a/9eK2g/Ote0yQU3o0bMXR4T6I3k4R/sr1TAvUkbeTG+1t/qJQKjlUKe58L7bBdjUx3UfRuboyjP6LO38RFlKfNMhjzkwsklWWfnRIQxguX6bf1yD7iQumkgRoW9VoqKEhNppvl518+UnFJ4PVwQRw=");    
}
