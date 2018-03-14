using Microsoft.VisualStudio.TestTools.UnitTesting;
using DataContext;
using DataContext.Models;
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Moq;
using System.Linq;

namespace DataContextTest
{
    [TestClass]
    public class DataContextTest
    {

        [TestInitialize]
        public void TestInitialize()
        {
           
        }

        [TestMethod]
        public void CheckGetStudents()
        {
            var students = new List<Student>
            {
                new Student{ ID=1,FirstMidName="Carson",LastName="Alexander",EnrollmentDate=DateTime.Parse("2005-09-01")},
                new Student{ ID=2,FirstMidName="Meredith",LastName="Alonso",EnrollmentDate=DateTime.Parse("2002-09-01")},
  
            }.AsQueryable<Student>();
            var mockSet = new Mock<DbSet<Student>>();
       
            mockSet.As<IQueryable<Student>>().Setup(m => m.Provider).Returns(students.Provider);
            mockSet.As<IQueryable<Student>>().Setup(m => m.Expression).Returns(students.Expression);
            mockSet.As<IQueryable<Student>>().Setup(m => m.ElementType).Returns(students.ElementType);
            mockSet.As<IQueryable<Student>>().Setup(m => m.GetEnumerator()).Returns(() => students.GetEnumerator());
            var mockContext = new Mock<DataContext.DataContext>();
            mockContext.Setup(c => c.Set<Student>()).Returns(mockSet.Object);
            DataContext.RepositoryImplementation.Repository obj = new DataContext.RepositoryImplementation.Repository(mockContext.Object);

            var allStudents = obj.GetAll<Student>();
            List<Student> lstAllStudents = allStudents.ToList();
            Assert.AreEqual(2, lstAllStudents.Count);
        }

        [TestMethod]
        public void CheckGetEnrollment()
        {

        }

    }
}



