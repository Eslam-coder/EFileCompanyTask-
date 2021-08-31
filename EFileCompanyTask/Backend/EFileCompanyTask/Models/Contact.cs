using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EFileCompanyTask.Models
{
    public class Contact
    {
        public int ContactId { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Notes { get; set; }
        public Boolean IsLocked { get; set; } = false;

    }
}
