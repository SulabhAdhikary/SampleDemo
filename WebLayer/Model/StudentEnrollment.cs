using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataContext.Models;

namespace WebLayer.Model
{
    public class StudentEnrollment
    {
        public string CourseTitle { get; set; }
        public String  Grade { get; set; }
        public int Credit { get; set; }
    }
}
