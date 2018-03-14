using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;
using DataContext;
using Microsoft.EntityFrameworkCore;
using DataContext.RepositoryContracts;
using DataContext.RepositoryImplementation;
using WebLayer.Services;

namespace practiseToDoApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            string connection = Configuration["ConnectionStrings:NorthWindLocalContext"];


            var autSevice = services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme);
            autSevice.AddJwtBearer(options =>
            {
                JwtTokenImplementation.JwtTokenPArameters(options, Configuration);
            });
           
            services.AddDbContext<DataContext.DataContext>(options => options.UseSqlServer(connection));
            services.AddTransient<IRepositoryBase, Repository>();
            services.AddTransient<IApplicationUserService, ApplicationUserSevice>();
            services.AddTransient<ITokenManagement, TokenManagement>();
            services.AddMvc();


        // In production, the Angular files will be served from this directory
           services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

       

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            //Creting Database and seeding it 
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<DataContext.DataContext>();
                context.Database.Migrate();
                context.EnsureSeedData();
            }
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {   
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
  


    }
}
