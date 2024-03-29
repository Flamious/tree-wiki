using BLL.Interfaces;
using BLL.Services;
using DAL.EF;
using DAL.Interfaces;
using DAL.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TreeWikiApi
{
    public class Startup
    {
        private string _policy = "sidePolicy";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            string dbconectionString = Configuration.GetConnectionString("DefaultConnection");
            services.AddEntityFrameworkSqlServer().AddDbContext<DatabaseContext>(options => options.UseSqlServer(dbconectionString, ef => ef.MigrationsAssembly(typeof(DatabaseContext).Assembly.FullName)));
            services.AddScoped<DbContext>(provider => provider.GetService<DatabaseContext>());

            services.AddSingleton<IDatabaseContextFactory, DatabaseContextFactory>();

            services.AddScoped<IWorkRepository, WorkRepository>(provider =>
                new WorkRepository(dbconectionString, provider.GetService<IDatabaseContextFactory>()));
            services.AddScoped<ICharacterRepository, CharacterRepository>(provider =>
                new CharacterRepository(dbconectionString, provider.GetService<IDatabaseContextFactory>()));
            services.AddScoped<IConnectionRepository, ConnectionRepository>(provider =>
                new ConnectionRepository(dbconectionString, provider.GetService<IDatabaseContextFactory>()));

            services.AddScoped<ICharacterService, CharacterService>();
            services.AddScoped<IConnectionService, ConnectionService>();
            services.AddScoped<IWorkService, WorkService>();

            services.AddCors(options => 
            {
                options.AddPolicy(_policy, builder =>
                {
                    builder.WithOrigins("http://localhost:4200")
                    .AllowAnyHeader()
                    .SetIsOriginAllowed(origin => true)
                    .AllowAnyMethod()
                    .AllowCredentials();
                });
            });
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo() { Title = "Balance", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                app.UseSwagger();

                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Api");
                });
            }


            app.UseHttpsRedirection();

            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseCors(_policy);

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
