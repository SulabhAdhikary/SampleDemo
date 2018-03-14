using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataContext.Models
{
    public class Course
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public virtual int CourseID { get; set; }
        public virtual string Title { get; set; }
        public virtual int Credits { get; set; }

        public virtual ICollection<Enrollment> Enrollments { get; set; }
    }
}
