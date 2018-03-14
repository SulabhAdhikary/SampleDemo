using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataContext.RepositoryContracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DataContext.Models;
using Microsoft.EntityFrameworkCore;
using WebLayer.Model;

namespace SampleApplication.Controllers
{
    [Route("api/[controller]")]
    public class FetchDataController : Controller
    {

        public IRepositoryBase _repository { get; set; }

        public FetchDataController(IRepositoryBase repository)
        {
            _repository = repository;
        }

        [Authorize]
        [HttpGet("[action]")]
        public async Task<List<Student>> GetAllStudents()
        {

            var allStudents= _repository.GetAll<Student>();
            List<Student> lstAllStudents = await allStudents.ToListAsync();
            return lstAllStudents;

        }

        [Authorize]
        [HttpGet("[action]")]
        public async Task<List<StudentEnrollment>> GetStudentCourseEnrollment(int studentID)
        {

            List<Enrollment> lstStudentsEnrollment = await _repository.GetAllIncluding<Enrollment>(t => t.Course).Where(t=>t.StudentID==studentID).Select(t=>t).ToListAsync<Enrollment>();

            List<StudentEnrollment> lstStudentEnrolment = lstStudentsEnrollment.Select(t => new StudentEnrollment
            {
                CourseTitle = t.Course.Title,
                Credit = t.Course.Credits,
                Grade = t.Grade.ToString()
            }).ToList<StudentEnrollment>();
            return lstStudentEnrolment;

        }



        




    }
}
