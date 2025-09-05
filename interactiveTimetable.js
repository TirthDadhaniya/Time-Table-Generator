// INTERACTIVE MULTI-SEMESTER TIMETABLE GENERATOR WITH TIME SLOTS
const readline = require("readline");
const database = require("./database.js");

// CONFIG - Time slots with actual hours
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = [
  { slot: 1, startTime: "09:00", endTime: "10:00" },
  { slot: 2, startTime: "10:00", endTime: "11:00" },
  { slot: 3, startTime: "11:00", endTime: "12:00" },
  { slot: 4, startTime: "12:00", endTime: "13:00" },
  { slot: 5, startTime: "14:00", endTime: "15:00" }, // Lunch break between 13:00-14:00
  { slot: 6, startTime: "15:00", endTime: "16:00" },
  { slot: 7, startTime: "16:00", endTime: "17:00" },
  { slot: 8, startTime: "17:00", endTime: "18:00" },
];

// Global state to track all generated timetables and faculty schedules
class TimetableSystem {
  constructor() {
    this.generatedTimetables = {}; // Store all semester timetables
    this.globalFacultySchedule = this.initializeGlobalFacultySchedule();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  // Initialize global faculty schedule tracking
  initializeGlobalFacultySchedule() {
    const schedule = {};
    database.faculties.forEach((faculty) => {
      schedule[faculty.name] = {};
      days.forEach((day) => {
        schedule[faculty.name][day] = Array(timeSlots.length).fill(null);
      });
    });
    return schedule;
  }

  // Check if faculty is available at a specific time slot
  isFacultyAvailable(facultyName, day, slot) {
    return (
      this.globalFacultySchedule[facultyName] &&
      this.globalFacultySchedule[facultyName][day] &&
      this.globalFacultySchedule[facultyName][day][slot] === null
    );
  }

  // Book faculty for a specific time slot
  bookFaculty(facultyName, day, slot, subject, semester) {
    if (this.globalFacultySchedule[facultyName] && this.globalFacultySchedule[facultyName][day]) {
      this.globalFacultySchedule[facultyName][day][slot] = {
        subject: subject,
        semester: semester,
        time: `${timeSlots[slot].startTime}-${timeSlots[slot].endTime}`,
      };
    }
  }

  // Display faculty availability table
  displayFacultyAvailability() {
    console.log("\n" + "=".repeat(120));
    console.log("📅 FACULTY AVAILABILITY TABLE");
    console.log("=".repeat(120));

    console.log("Faculty Name".padEnd(25) + days.map((day) => day.padEnd(18)).join(""));
    console.log("-".repeat(120));

    database.faculties.forEach((faculty) => {
      let row = faculty.name.padEnd(25);
      days.forEach((day) => {
        let dayInfo = "";
        let busySlots = 0;
        for (let slot = 0; slot < timeSlots.length; slot++) {
          if (this.globalFacultySchedule[faculty.name][day][slot] !== null) {
            busySlots++;
          }
        }
        dayInfo = `${timeSlots.length - busySlots}/${timeSlots.length} Free`.padEnd(18);
        row += dayInfo;
      });
      console.log(row);
    });

    console.log("-".repeat(120));
    console.log("Legend: X/Y Free means X slots available out of Y total slots");
  }

  // Display detailed faculty schedule
  displayDetailedFacultySchedule() {
    console.log("\n" + "=".repeat(140));
    console.log("📋 DETAILED FACULTY SCHEDULE");
    console.log("=".repeat(140));

    database.faculties.forEach((faculty) => {
      console.log(`\n👨‍🏫 ${faculty.name} (${faculty.specialization}):`);
      console.log("-".repeat(80));

      days.forEach((day) => {
        console.log(`${day}:`);
        let hasSchedule = false;
        for (let slot = 0; slot < timeSlots.length; slot++) {
          const booking = this.globalFacultySchedule[faculty.name][day][slot];
          if (booking) {
            console.log(
              `  ${timeSlots[slot].startTime}-${timeSlots[slot].endTime}: ${booking.subject} (Sem ${booking.semester})`
            );
            hasSchedule = true;
          }
        }
        if (!hasSchedule) {
          console.log("  No classes scheduled");
        }
      });
    });
  }

  // Generate timetable for a semester
  async generateSemesterTimetable(semesterNumber) {
    console.log(`\n🎓 GENERATING TIMETABLE FOR SEMESTER ${semesterNumber}`);
    console.log("=".repeat(60));

    const subjects = this.getSubjectsForSemester(semesterNumber);
    const timetable = {};

    // Initialize timetable
    days.forEach((day) => {
      timetable[day] = Array(timeSlots.length).fill(null);
    });

    // Place labs first (2 consecutive hours)
    await this.placeLabs(subjects, timetable, semesterNumber);

    // Place lectures
    await this.placeLectures(subjects, timetable, semesterNumber);

    // Fill remaining slots as free
    this.fillFreeSlots(timetable);

    // Store the generated timetable
    this.generatedTimetables[semesterNumber] = timetable;

    // Display results
    this.displayTimetable(semesterNumber, timetable);
    this.displaySubjectSummary(semesterNumber, subjects, timetable);

    return timetable;
  }

  // Get subjects for semester
  getSubjectsForSemester(semesterNumber) {
    return database.subjectAssignments
      .filter((assignment) => assignment.semester === semesterNumber)
      .map((assignment) => ({
        id: assignment.subjectId,
        name: assignment.subjectName,
        code: assignment.subjectCode,
        lectures: assignment.lectures,
        labs: assignment.labs,
        faculty: assignment.facultyName,
        credits: assignment.credits,
      }));
  }

  // Place labs (2-hour sessions)
  async placeLabs(subjects, timetable, semester) {
    console.log("📍 Placing lab sessions...");

    for (let subject of subjects) {
      let labsNeeded = subject.labs;

      while (labsNeeded > 0) {
        let placed = false;
        const shuffledDays = [...days].sort(() => Math.random() - 0.5);

        for (let day of shuffledDays) {
          // Check if this day already has a lab
          let dayHasLab = false;
          for (let slot = 0; slot < timeSlots.length - 1; slot++) {
            if (timetable[day][slot] && timetable[day][slot].subject && timetable[day][slot].subject.includes(" Lab")) {
              dayHasLab = true;
              break;
            }
          }

          if (dayHasLab) continue;

          // Try to place 2-hour lab
          const shuffledSlots = Array.from({ length: timeSlots.length - 1 }, (_, i) => i).sort(
            () => Math.random() - 0.5
          );

          for (let slot of shuffledSlots) {
            if (
              !timetable[day][slot] &&
              !timetable[day][slot + 1] &&
              this.isFacultyAvailable(subject.faculty, day, slot) &&
              this.isFacultyAvailable(subject.faculty, day, slot + 1)
            ) {
              // Place the lab
              const labEntry = {
                subject: subject.name + " Lab",
                faculty: subject.faculty,
                code: subject.code,
                isLab: true,
                time: `${timeSlots[slot].startTime}-${timeSlots[slot + 1].endTime}`,
              };

              timetable[day][slot] = labEntry;
              timetable[day][slot + 1] = labEntry;

              // Book faculty
              this.bookFaculty(subject.faculty, day, slot, subject.name + " Lab", semester);
              this.bookFaculty(subject.faculty, day, slot + 1, subject.name + " Lab", semester);

              labsNeeded -= 2;
              placed = true;
              break;
            }
          }
          if (placed) break;
        }

        if (!placed) {
          console.log(`⚠️  Warning: Could not place all labs for ${subject.name}`);
          break;
        }
      }
    }
  }

  // Place lectures
  async placeLectures(subjects, timetable, semester) {
    console.log("📍 Placing lectures...");

    let lectureQueue = [];
    subjects.forEach((subject) => {
      for (let i = 0; i < subject.lectures; i++) {
        lectureQueue.push(subject);
      }
    });

    lectureQueue.sort(() => Math.random() - 0.5);

    for (let subject of lectureQueue) {
      let placed = false;
      const shuffledDays = [...days].sort(() => Math.random() - 0.5);

      for (let day of shuffledDays) {
        // Check if this subject already has a lecture today
        let hasLectureToday = false;
        for (let slot = 0; slot < timeSlots.length; slot++) {
          if (timetable[day][slot] && timetable[day][slot].subject === subject.name && !timetable[day][slot].isLab) {
            hasLectureToday = true;
            break;
          }
        }

        if (hasLectureToday) continue;

        const shuffledSlots = Array.from({ length: timeSlots.length }, (_, i) => i).sort(() => Math.random() - 0.5);

        for (let slot of shuffledSlots) {
          if (!timetable[day][slot] && this.isFacultyAvailable(subject.faculty, day, slot)) {
            // Place the lecture
            timetable[day][slot] = {
              subject: subject.name,
              faculty: subject.faculty,
              code: subject.code,
              isLab: false,
              time: `${timeSlots[slot].startTime}-${timeSlots[slot].endTime}`,
            };

            // Book faculty
            this.bookFaculty(subject.faculty, day, slot, subject.name, semester);

            placed = true;
            break;
          }
        }
        if (placed) break;
      }

      if (!placed) {
        console.log(`⚠️  Warning: Could not place lecture for ${subject.name}`);
      }
    }
  }

  // Fill free slots
  fillFreeSlots(timetable) {
    days.forEach((day) => {
      for (let slot = 0; slot < timeSlots.length; slot++) {
        if (!timetable[day][slot]) {
          timetable[day][slot] = {
            subject: "Free",
            faculty: "",
            code: "",
            time: `${timeSlots[slot].startTime}-${timeSlots[slot].endTime}`,
          };
        }
      }
    });
  }

  // Display timetable
  displayTimetable(semester, timetable) {
    console.log(`\n📅 SEMESTER ${semester} TIMETABLE`);
    console.log("=".repeat(120));

    // Header with times
    let header = "Time".padEnd(12);
    days.forEach((day) => {
      header += day.padEnd(20);
    });
    console.log(header);
    console.log("-".repeat(120));

    // Timetable rows
    for (let slot = 0; slot < timeSlots.length; slot++) {
      let row = `${timeSlots[slot].startTime}-${timeSlots[slot].endTime}`.padEnd(12);

      days.forEach((day) => {
        const entry = timetable[day][slot];
        let display = "Free";
        if (entry && entry.subject !== "Free") {
          display = `${entry.code || entry.subject}(${entry.faculty.split(" ")[1] || entry.faculty})`;
        }
        row += display.substring(0, 19).padEnd(20);
      });

      console.log(row);
    }
  }

  // Display subject summary
  displaySubjectSummary(semester, subjects, timetable) {
    console.log(`\n📊 SEMESTER ${semester} SUMMARY`);
    console.log("-".repeat(60));

    subjects.forEach((subject) => {
      let lectureCount = 0;
      let labCount = 0;

      days.forEach((day) => {
        for (let slot = 0; slot < timeSlots.length; slot++) {
          const entry = timetable[day][slot];
          if (entry.subject === subject.name) {
            lectureCount++;
          } else if (entry.subject === subject.name + " Lab") {
            labCount++;
          }
        }
      });

      const labSessions = labCount / 2;
      console.log(
        `${subject.code}: ${lectureCount}/${subject.lectures} lectures + ${labSessions}/${subject.labs} labs (${subject.faculty})`
      );
    });
  }

  // Interactive menu
  async runInteractiveSystem() {
    console.log("🎓 WELCOME TO INTERACTIVE TIMETABLE GENERATOR");
    console.log("=".repeat(60));
    console.log("Time Range: 9:00 AM - 6:00 PM");
    console.log("Available Slots per Day: 8 (with lunch break 1:00-2:00 PM)");
    console.log("=".repeat(60));

    while (true) {
      console.log("\n🎯 MAIN MENU:");
      console.log("1. Generate timetable for a semester");
      console.log("2. View faculty availability");
      console.log("3. View detailed faculty schedule");
      console.log("4. View generated timetables");
      console.log("5. Exit");

      const choice = await this.askQuestion("\n👉 Enter your choice (1-5): ");

      switch (choice) {
        case "1":
          await this.handleTimetableGeneration();
          break;
        case "2":
          this.displayFacultyAvailability();
          break;
        case "3":
          this.displayDetailedFacultySchedule();
          break;
        case "4":
          this.displayAllGeneratedTimetables();
          break;
        case "5":
          console.log("👋 Thank you for using the Timetable Generator!");
          this.rl.close();
          return;
        default:
          console.log("❌ Invalid choice. Please try again.");
      }
    }
  }

  // Handle timetable generation
  async handleTimetableGeneration() {
    while (true) {
      const semester = await this.askQuestion("\n📚 Enter semester number (1-7): ");
      const semNum = parseInt(semester);

      if (semNum >= 1 && semNum <= 7) {
        if (this.generatedTimetables[semNum]) {
          const overwrite = await this.askQuestion(
            `⚠️  Semester ${semNum} timetable already exists. Overwrite? (y/n): `
          );
          if (overwrite.toLowerCase() !== "y") {
            continue;
          }
          // Clear existing faculty bookings for this semester
          this.clearSemesterBookings(semNum);
        }

        await this.generateSemesterTimetable(semNum);

        const continueGen = await this.askQuestion("\n🔄 Generate another semester? (y/n): ");
        if (continueGen.toLowerCase() !== "y") {
          break;
        }
      } else {
        console.log("❌ Invalid semester number. Please enter 1-7.");
      }
    }
  }

  // Clear semester bookings
  clearSemesterBookings(semester) {
    database.faculties.forEach((faculty) => {
      days.forEach((day) => {
        for (let slot = 0; slot < timeSlots.length; slot++) {
          const booking = this.globalFacultySchedule[faculty.name][day][slot];
          if (booking && booking.semester === semester) {
            this.globalFacultySchedule[faculty.name][day][slot] = null;
          }
        }
      });
    });
    delete this.generatedTimetables[semester];
  }

  // Display all generated timetables
  displayAllGeneratedTimetables() {
    console.log("\n📋 GENERATED TIMETABLES:");
    console.log("-".repeat(40));

    if (Object.keys(this.generatedTimetables).length === 0) {
      console.log("No timetables generated yet.");
      return;
    }

    Object.keys(this.generatedTimetables).forEach((semester) => {
      console.log(`✅ Semester ${semester}`);
    });
  }

  // Helper to ask questions
  askQuestion(question) {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer.trim());
      });
    });
  }
}

// Export the system
module.exports = { TimetableSystem, timeSlots, days };

// Run if called directly
if (require.main === module) {
  const system = new TimetableSystem();
  system.runInteractiveSystem().catch(console.error);
}
