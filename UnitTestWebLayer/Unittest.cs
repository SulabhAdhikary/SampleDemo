using DataContext.RepositoryContracts;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using SampleApplication.Controllers;
using DataContext.Models;
using System.Collections.Generic;
using System;
using Microsoft.AspNetCore.Http;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DataContext.RepositoryImplementation;

namespace UnitTestWebLayer
{
    [TestClass]
    public class Unittest
    {
        private DataContext.DataContext _dataContext;

        //Unittest()
        //{
          
        //}

        public void InitContext()
        {
            var builder = new DbContextOptionsBuilder<DataContext.DataContext>()
                .UseInMemoryDatabase("NorthWindLocalContext");

            var context = new DataContext.DataContext(builder.Options);
            var students = new List<Student>
            {
                new Student{ ID=1,FirstMidName="Carson",LastName="Alexander",EnrollmentDate=DateTime.Parse("2005-09-01")},
                new Student{ ID=2,FirstMidName="Meredith",LastName="Alonso",EnrollmentDate=DateTime.Parse("2002-09-01")},

            };
            context.Students.AddRange(students);
            int changed = context.SaveChanges();
            _dataContext = context;
        }


        [TestMethod]
        public async Task TestMethod1()
        {
            InitContext();
            var rep= new Repository(_dataContext);
           FetchDataController objController = new FetchDataController(rep);
            var tskStudent = await objController.GetAllStudents();
            
            Assert.AreEqual(tskStudent.Count, 2);

          
        }
    }
}
