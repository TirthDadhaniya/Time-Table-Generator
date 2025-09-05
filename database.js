// DATABASE FOR MULTI-SEMESTER TIMETABLE SYSTEM

// Faculty Database with their specializations
const faculties = [
  { id: 1, name: "Prof. Rajesh Sharma", specialization: "Computer Science", maxSubjects: 2 },
  { id: 2, name: "Prof. Priya Patel", specialization: "Software Engineering", maxSubjects: 2 },
  { id: 3, name: "Prof. Amit Kumar", specialization: "Data Science", maxSubjects: 1 },
  { id: 4, name: "Prof. Sneha Gupta", specialization: "Web Technologies", maxSubjects: 2 },
  { id: 5, name: "Prof. Vikram Singh", specialization: "Database Systems", maxSubjects: 2 },
  { id: 6, name: "Prof. Kavya Reddy", specialization: "Machine Learning", maxSubjects: 1 },
  { id: 7, name: "Prof. Rohit Jain", specialization: "Networks", maxSubjects: 2 },
  { id: 8, name: "Prof. Meera Shah", specialization: "Mobile Development", maxSubjects: 2 },
  { id: 9, name: "Prof. Arjun Mehta", specialization: "Cyber Security", maxSubjects: 1 },
  { id: 10, name: "Prof. Divya Agarwal", specialization: "Cloud Computing", maxSubjects: 2 },
  { id: 11, name: "Prof. Kiran Verma", specialization: "AI/ML", maxSubjects: 2 },
  { id: 12, name: "Prof. Sanjay Joshi", specialization: "System Programming", maxSubjects: 1 },
  { id: 13, name: "Prof. Nisha Thakur", specialization: "Graphics", maxSubjects: 2 },
  { id: 14, name: "Prof. Rahul Kapoor", specialization: "Algorithms", maxSubjects: 2 },
  { id: 15, name: "Prof. Pooja Malhotra", specialization: "Human Computer Interaction", maxSubjects: 1 },
  { id: 16, name: "Prof. Deepak Yadav", specialization: "Operating Systems", maxSubjects: 2 },
  { id: 17, name: "Prof. Anjali Mishra", specialization: "Compiler Design", maxSubjects: 2 },
  { id: 18, name: "Prof. Suresh Pandey", specialization: "Mathematics", maxSubjects: 1 },
  { id: 19, name: "Prof. Ritu Saxena", specialization: "Project Management", maxSubjects: 2 },
  { id: 20, name: "Prof. Manish Agrawal", specialization: "Distributed Systems", maxSubjects: 2 },
];

// All subjects for all semesters
const allSubjects = {
  1: [
    // 1st Semester
    { id: 101, name: "Programming Fundamentals", code: "CS101", lectures: 4, labs: 2, credits: 4 },
    { id: 102, name: "Mathematics I", code: "MA101", lectures: 4, labs: 0, credits: 4 },
    { id: 103, name: "Digital Logic", code: "CS102", lectures: 3, labs: 2, credits: 4 },
    { id: 104, name: "Communication Skills", code: "EN101", lectures: 3, labs: 0, credits: 3 },
    { id: 105, name: "Physics", code: "PH101", lectures: 3, labs: 2, credits: 4 },
  ],
  2: [
    // 2nd Semester
    { id: 201, name: "Data Structures", code: "CS201", lectures: 4, labs: 2, credits: 4 },
    { id: 202, name: "Mathematics II", code: "MA201", lectures: 4, labs: 0, credits: 4 },
    { id: 203, name: "Computer Organization", code: "CS202", lectures: 3, labs: 2, credits: 4 },
    { id: 204, name: "Object Oriented Programming", code: "CS203", lectures: 3, labs: 2, credits: 4 },
    { id: 205, name: "Electronics", code: "EC201", lectures: 3, labs: 2, credits: 4 },
  ],
  3: [
    // 3rd Semester
    { id: 301, name: "Algorithms", code: "CS301", lectures: 4, labs: 2, credits: 4 },
    { id: 302, name: "Database Systems", code: "CS302", lectures: 3, labs: 2, credits: 4 },
    { id: 303, name: "Operating Systems", code: "CS303", lectures: 3, labs: 2, credits: 4 },
    { id: 304, name: "Computer Networks", code: "CS304", lectures: 3, labs: 2, credits: 4 },
    { id: 305, name: "Discrete Mathematics", code: "MA301", lectures: 3, labs: 0, credits: 3 },
  ],
  4: [
    // 4th Semester
    { id: 401, name: "Software Engineering", code: "CS401", lectures: 3, labs: 2, credits: 4 },
    { id: 402, name: "Web Technologies", code: "CS402", lectures: 3, labs: 2, credits: 4 },
    { id: 403, name: "Compiler Design", code: "CS403", lectures: 3, labs: 2, credits: 4 },
    { id: 404, name: "Computer Graphics", code: "CS404", lectures: 3, labs: 2, credits: 4 },
    { id: 405, name: "System Programming", code: "CS405", lectures: 3, labs: 2, credits: 4 },
  ],
  5: [
    // 5th Semester
    { id: 501, name: "Machine Learning", code: "CS501", lectures: 3, labs: 2, credits: 4 },
    { id: 502, name: "Mobile Application Development", code: "CS502", lectures: 3, labs: 2, credits: 4 },
    { id: 503, name: "Cyber Security", code: "CS503", lectures: 3, labs: 2, credits: 4 },
    { id: 504, name: "Data Mining", code: "CS504", lectures: 3, labs: 2, credits: 4 },
    { id: 505, name: "Human Computer Interaction", code: "CS505", lectures: 3, labs: 0, credits: 3 },
  ],
  6: [
    // 6th Semester
    { id: 601, name: "Artificial Intelligence", code: "CS601", lectures: 3, labs: 2, credits: 4 },
    { id: 602, name: "Cloud Computing", code: "CS602", lectures: 3, labs: 2, credits: 4 },
    { id: 603, name: "Distributed Systems", code: "CS603", lectures: 3, labs: 2, credits: 4 },
    { id: 604, name: "Big Data Analytics", code: "CS604", lectures: 3, labs: 2, credits: 4 },
    { id: 605, name: "Software Project Management", code: "CS605", lectures: 3, labs: 0, credits: 3 },
  ],
  7: [
    // 7th Semester
    { id: 701, name: "Advanced Database Management", code: "ADUD", lectures: 3, labs: 0, credits: 3 },
    { id: 702, name: "Advanced Machine Learning", code: "AML", lectures: 3, labs: 2, credits: 4 },
    { id: 703, name: "Computer Vision", code: "CV", lectures: 3, labs: 2, credits: 4 },
    { id: 704, name: "Internet of Things", code: "IOT", lectures: 2, labs: 2, credits: 3 },
    { id: 705, name: "Wireless Communication", code: "WC", lectures: 3, labs: 2, credits: 4 },
  ],
};

// Function to randomly assign subjects to faculty
function assignSubjectsToFaculty() {
  const assignments = [];
  const facultyAssignments = {}; // Track how many subjects each faculty has

  // Initialize faculty assignment counts
  faculties.forEach((faculty) => {
    facultyAssignments[faculty.id] = 0;
  });

  // Get all subjects from all semesters
  const allSubjectsList = [];
  Object.keys(allSubjects).forEach((sem) => {
    allSubjects[sem].forEach((subject) => {
      allSubjectsList.push({ ...subject, semester: parseInt(sem) });
    });
  });

  // Shuffle subjects for random assignment
  const shuffledSubjects = allSubjectsList.sort(() => Math.random() - 0.5);

  shuffledSubjects.forEach((subject) => {
    // Find available faculty (those who haven't reached their max subjects)
    const availableFaculty = faculties.filter((faculty) => facultyAssignments[faculty.id] < faculty.maxSubjects);

    if (availableFaculty.length > 0) {
      // Randomly select from available faculty
      const selectedFaculty = availableFaculty[Math.floor(Math.random() * availableFaculty.length)];

      assignments.push({
        subjectId: subject.id,
        subjectName: subject.name,
        subjectCode: subject.code,
        semester: subject.semester,
        facultyId: selectedFaculty.id,
        facultyName: selectedFaculty.name,
        lectures: subject.lectures,
        labs: subject.labs,
        credits: subject.credits,
      });

      facultyAssignments[selectedFaculty.id]++;
    }
  });

  return assignments;
}

// Generate faculty availability for all faculty (assuming all are available all the time for now)
function generateFacultyAvailability() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const slotsPerDay = 6;
  const availability = {};

  faculties.forEach((faculty) => {
    availability[faculty.name] = {};
    days.forEach((day) => {
      availability[faculty.name][day] = Array(slotsPerDay).fill(true);
    });
  });

  return availability;
}

// Generate the complete database
function generateDatabase() {
  const subjectAssignments = assignSubjectsToFaculty();
  const facultyAvailability = generateFacultyAvailability();

  return {
    faculties,
    allSubjects,
    subjectAssignments,
    facultyAvailability,
  };
}

// Export the database
const database = generateDatabase();

// Display summary
console.log("=== DATABASE GENERATED ===\n");

console.log("FACULTIES:");
faculties.forEach((faculty) => {
  const assignedSubjects = database.subjectAssignments.filter((assignment) => assignment.facultyId === faculty.id);
  console.log(
    `${faculty.name} (${faculty.specialization}) - ${assignedSubjects.length}/${faculty.maxSubjects} subjects`
  );
  assignedSubjects.forEach((subject) => {
    console.log(`  - Sem ${subject.semester}: ${subject.subjectName} (${subject.subjectCode})`);
  });
});

console.log("\n=== SEMESTER WISE SUBJECTS ===");
Object.keys(allSubjects).forEach((sem) => {
  console.log(`\nSemester ${sem}:`);
  const semesterAssignments = database.subjectAssignments.filter((assignment) => assignment.semester === parseInt(sem));
  semesterAssignments.forEach((assignment) => {
    console.log(`  ${assignment.subjectCode}: ${assignment.subjectName} - ${assignment.facultyName}`);
  });
});

console.log("\n=== FACULTY WORKLOAD SUMMARY ===");
faculties.forEach((faculty) => {
  const assignedSubjects = database.subjectAssignments.filter((assignment) => assignment.facultyId === faculty.id);
  const semesters = [...new Set(assignedSubjects.map((s) => s.semester))];
  console.log(
    `${faculty.name}: ${assignedSubjects.length} subjects across ${semesters.length} semesters (${semesters.join(
      ", "
    )})`
  );
});

module.exports = database;
