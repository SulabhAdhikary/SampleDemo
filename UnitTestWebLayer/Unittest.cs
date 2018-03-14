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

namespace UnitTestWebLayer
{
    [TestClass]
    public class Unittest
    {
        [TestMethod]
        public async Task TestMethod1()
        {
           var rep= new Mock<IRepositoryBase>();

            var students = new List<Student>
            {
                new Student{ ID=1,FirstMidName="Carson",LastName="Alexander",EnrollmentDate=DateTime.Parse("2005-09-01")},
                new Student{ ID=2,FirstMidName="Meredith",LastName="Alonso",EnrollmentDate=DateTime.Parse("2002-09-01")},

            }.AsQueryable<Student>();

          


            rep.Setup(t => t.GetAll<Student>()).Returns(students);
            FetchDataController objController = new FetchDataController(rep.Object);

            var tskStudent = await objController.GetAllStudents();
            
            Assert.AreEqual(tskStudent.Count, 2);

          
        }
    }
}
