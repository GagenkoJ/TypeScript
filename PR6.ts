// Крок 1. Enum-и

enum StudentStatus {
  Active = "Active",
  Academic_Leave = "Academic_Leave",
  Graduated = "Graduated",
  Expelled = "Expelled",
}

enum CourseType {
  Mandatory = "Mandatory",
  Optional = "Optional",
  Special = "Special",
}

enum Semester {
  First = "First",
  Second = "Second",
}

enum Grade {
  Excellent = 5,
  Good = 4,
  Satisfactory = 3,
  Unsatisfactory = 2,
}

enum Faculty {
  Computer_Science = "Computer_Science",
  Economics = "Economics",
  Law = "Law",
  Engineering = "Engineering",
}

// Крок 2. Інтерфейси

interface Student {
  id: number;
  fullName: string;
  faculty: Faculty;
  year: number;
  status: StudentStatus;
  enrollmentDate: Date;
  groupNumber: string;
}

interface Course {
  id: number;
  name: string;
  type: CourseType;
  credits: number;
  semester: Semester;
  faculty: Faculty;
  maxStudents: number;
}

interface GradeRecord {
  studentId: number;
  courseId: number;
  grade: Grade;
  date: Date;
  semester: Semester;
}

interface Registration {
  studentId: number;
  courseId: number;
}

// Крок 3. Клас системи університету

class UniversityManagementSystem {
  private students: Student[] = [];
  private courses: Course[] = [];
  private registrations: Registration[] = [];
  private grades: GradeRecord[] = [];
  private nextStudentId: number = 1;

  constructor(initialCourses: Course[] = []) {
    this.courses = initialCourses;
  }

  enrollStudent(student: Omit<Student, "id">): Student {
    const newStudent: Student = { ...student, id: this.nextStudentId++ };
    this.students.push(newStudent);
    return newStudent;
  }

  registerForCourse(studentId: number, courseId: number): void {
    const student = this.students.find((s) => s.id === studentId);
    const course = this.courses.find((c) => c.id === courseId);

    if (!student || !course) return;
    if (student.status !== StudentStatus.Active) return;
    if (student.faculty !== course.faculty) return;

    const registeredCount = this.registrations.filter(
      (r) => r.courseId === courseId
    ).length;

    if (registeredCount >= course.maxStudents) return;

    const alreadyRegistered = this.registrations.some(
      (r) => r.studentId === studentId && r.courseId === courseId
    );

    if (alreadyRegistered) return;

    this.registrations.push({ studentId, courseId });
  }

  setGrade(studentId: number, courseId: number, grade: Grade): void {
    const student = this.students.find((s) => s.id === studentId);
    const course = this.courses.find((c) => c.id === courseId);

    if (!student || !course) return;

    const isRegistered = this.registrations.some(
      (r) => r.studentId === studentId && r.courseId === courseId
    );

    if (!isRegistered) return;

    const record: GradeRecord = {
      studentId,
      courseId,
      grade,
      date: new Date(),
      semester: course.semester,
    };

    this.grades.push(record);
  }

  updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
    const student = this.students.find((s) => s.id === studentId);
    if (!student) return;

    if (
      student.status === StudentStatus.Expelled ||
      student.status === StudentStatus.Graduated
    )
      return;

    student.status = newStatus;
  }

  getStudentsByFaculty(faculty: Faculty): Student[] {
    return this.students.filter((s) => s.faculty === faculty);
  }

  getStudentGrades(studentId: number): GradeRecord[] {
    return this.grades.filter((g) => g.studentId === studentId);
  }

  getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
    return this.courses.filter((course) => {
      if (course.faculty !== faculty || course.semester !== semester)
        return false;

      const registeredCount = this.registrations.filter(
        (r) => r.courseId === course.id
      ).length;

      return registeredCount < course.maxStudents;
    });
  }

  calculateAverageGrade(studentId: number): number {
    const studentGrades = this.getStudentGrades(studentId);
    if (studentGrades.length === 0) return 0;

    const sum = studentGrades.reduce((acc, rec) => acc + rec.grade, 0);
    return sum / studentGrades.length;
  }

  getExcellentStudentsByFaculty(faculty: Faculty): Student[] {
    const facultyStudents = this.getStudentsByFaculty(faculty);

    return facultyStudents.filter(
      (student) => this.calculateAverageGrade(student.id) >= 4.5
    );
  }
}

// Крок 4. Тестові дані

const baseCourses: Course[] = [
  {
    id: 1,
    name: "Програмування 1",
    type: CourseType.Mandatory,
    credits: 6,
    semester: Semester.First,
    faculty: Faculty.Computer_Science,
    maxStudents: 3,
  },
  {
    id: 2,
    name: "Алгоритми та структури даних",
    type: CourseType.Mandatory,
    credits: 6,
    semester: Semester.Second,
    faculty: Faculty.Computer_Science,
    maxStudents: 2,
  },
  {
    id: 3,
    name: "Мікроекономіка",
    type: CourseType.Mandatory,
    credits: 5,
    semester: Semester.First,
    faculty: Faculty.Economics,
    maxStudents: 2,
  },
];

const ums = new UniversityManagementSystem(baseCourses);

const student1 = ums.enrollStudent({
  fullName: "Іван Петренко",
  faculty: Faculty.Computer_Science,
  year: 1,
  status: StudentStatus.Active,
  enrollmentDate: new Date("2024-09-01"),
  groupNumber: "CS-11",
});

const student2 = ums.enrollStudent({
  fullName: "Марія Іваненко",
  faculty: Faculty.Computer_Science,
  year: 1,
  status: StudentStatus.Active,
  enrollmentDate: new Date("2024-09-01"),
  groupNumber: "CS-11",
});

const student3 = ums.enrollStudent({
  fullName: "Олег Коваль",
  faculty: Faculty.Economics,
  year: 2,
  status: StudentStatus.Active,
  enrollmentDate: new Date("2023-09-01"),
  groupNumber: "EC-21",
});

ums.registerForCourse(student1.id, 1);
ums.registerForCourse(student2.id, 1);
ums.registerForCourse(student3.id, 3);

ums.setGrade(student1.id, 1, Grade.Excellent);
ums.setGrade(student2.id, 1, Grade.Good);
ums.setGrade(student3.id, 3, Grade.Excellent);

console.log("Студенти CS:", ums.getStudentsByFaculty(Faculty.Computer_Science));
console.log("Оцінки студента 1:", ums.getStudentGrades(student1.id));
console.log("Доступні курси CS:", ums.getAvailableCourses(Faculty.Computer_Science, Semester.First));
console.log("Середній бал 1:", ums.calculateAverageGrade(student1.id));
console.log("Відмінники CS:", ums.getExcellentStudentsByFaculty(Faculty.Computer_Science));
