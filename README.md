# 🎓 Interactive Timetable Generator

A comprehensive multi-semester timetable generation system for educational institutions.

## 📁 Project Structure

### Core Files:

#### `interactiveTimetable.js` 🎯 **[MAIN FILE]**

- **Purpose**: Interactive timetable generator with real-time scheduling
- **Features**:
  - Interactive menu system
  - Real time slots (9:00 AM - 6:00 PM with lunch break)
  - Faculty conflict prevention across semesters
  - Global faculty availability tracking
  - Multiple semester coordination
  - Comprehensive reporting

#### `database.js` 📊 **[DATABASE]**

- **Purpose**: Complete database for all 7 semesters
- **Contains**:
  - 20 faculty members with specializations
  - 35 subjects across 7 semesters (5 subjects each)
  - Faculty-subject assignments (50% faculty have 2 subjects)
  - Faculty availability matrices

#### `demoInteractive.js` 🎬 **[DEMO/TESTING]**

- **Purpose**: Automated demo showing system capabilities
- **Usage**: Testing and demonstration without user interaction

## 🚀 How to Run

### Main Application:

```bash
node interactiveTimetable.js
```

### Demo/Testing:

```bash
node demoInteractive.js
```

### View Database:

```bash
node database.js
```

## ✨ Key Features

- ✅ **Real Time Slots**: 8 slots from 9:00 AM to 6:00 PM
- ✅ **Interactive Interface**: Menu-driven system
- ✅ **Multi-Semester Support**: Generate timetables for any semester (1-7)
- ✅ **Faculty Conflict Prevention**: No double booking across semesters
- ✅ **Smart Constraints**:
  - One lab per day maximum (2-hour consecutive slots)
  - One lecture per subject per day maximum
  - Faculty availability tracking
- ✅ **Comprehensive Reporting**: Detailed schedules and availability tables

## 🎯 Usage Workflow

1. **Start**: Run `node interactiveTimetable.js`
2. **Select**: Choose semester to generate (1-7)
3. **View**: Faculty availability and detailed schedules
4. **Continue**: Generate additional semesters without conflicts
5. **Monitor**: Real-time faculty booking status

## 📊 System Capacity

- **Faculty**: 20 professors with various specializations
- **Semesters**: 7 complete semesters
- **Subjects**: 35 total subjects (5 per semester)
- **Time Slots**: 8 slots per day × 5 days = 40 slots per week
- **Smart Assignment**: 50% faculty teach 2 subjects, 50% teach 1 subject

---

**🎓 Ready for institutional use with advanced conflict management and real-time scheduling!**
