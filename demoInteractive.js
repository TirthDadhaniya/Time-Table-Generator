// AUTOMATED DEMO OF INTERACTIVE TIMETABLE SYSTEM
const { TimetableSystem } = require("./interactiveTimetable.js");

async function runDemo() {
  console.log("🚀 AUTOMATED DEMO - INTERACTIVE TIMETABLE SYSTEM");
  console.log("=".repeat(70));

  const system = new TimetableSystem();

  console.log("\n1️⃣ GENERATING TIMETABLE FOR SEMESTER 1");
  await system.generateSemesterTimetable(1);

  console.log("\n📊 FACULTY AVAILABILITY AFTER SEMESTER 1");
  system.displayFacultyAvailability();

  console.log("\n2️⃣ GENERATING TIMETABLE FOR SEMESTER 7");
  await system.generateSemesterTimetable(7);

  console.log("\n📊 FACULTY AVAILABILITY AFTER BOTH SEMESTERS");
  system.displayFacultyAvailability();

  console.log("\n📋 DETAILED FACULTY SCHEDULE");
  system.displayDetailedFacultySchedule();

  console.log("\n✅ DEMO COMPLETED!");
  console.log("\n🎯 KEY FEATURES DEMONSTRATED:");
  console.log("✅ Real time slots (9:00 AM - 6:00 PM)");
  console.log("✅ Faculty conflict prevention across semesters");
  console.log("✅ Interactive semester selection");
  console.log("✅ Comprehensive faculty availability tracking");
  console.log("✅ Detailed scheduling reports");
  console.log("✅ Multiple semester coordination");

  return system;
}

// Export for testing
module.exports = { runDemo };

// Run demo if called directly
if (require.main === module) {
  runDemo().catch(console.error);
}
