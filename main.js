// Tab switching functionality
const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tabContents.forEach((content) => content.classList.add("hidden"));
    tab.classList.add("active");
    const tabId = tab.id.replace("-tab", "-content");
    const targetContent = document.getElementById(tabId);
    if (targetContent) {
      targetContent.classList.remove("hidden");
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("timetable-content").classList.remove("hidden");
  renderSubjects();
  renderFaculty();
});

// Subject Data Management
function getSubjects() {
  return JSON.parse(localStorage.getItem("subjects") || "[]");
}
function setSubjects(subjects) {
  localStorage.setItem("subjects", JSON.stringify(subjects));
}
function renderSubjects() {
  const subjectList = document.getElementById("subjectList");
  const subjects = getSubjects();
  subjectList.innerHTML = subjects.length === 0 ? '<p style="color:#888">No subjects added yet.</p>' : "";
  subjects.forEach((subj, idx) => {
    subjectList.innerHTML += `
      <div class="subject-card" style="position:relative; margin-bottom:16px; background:#fff; border-radius:10px; box-shadow:0 2px 8px rgba(0,0,0,0.04); padding:18px 20px;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-weight:700; font-size:1.1rem; color:#222;">${subj.name} <span style="color:#667eea; font-size:0.95em;">(${subj.code})</span></div>
            <div style="color:#555; font-size:0.95em; margin-top:2px;">Faculty: <b>${subj.faculty}</b> | Semester: <b>${subj.semester}</b></div>
            <div style="color:#666; font-size:0.93em; margin-top:2px;">Lecture: ${subj.lecture}h, Lab: ${subj.lab}h, Total: ${subj.total}h/week</div>
          </div>
          <div style="display:flex; gap:8px;">
            <button onclick="editSubject(${idx})" title="Edit" style="background:#f4f5f6; border:none; border-radius:6px; padding:6px 10px; cursor:pointer; color:#222; font-size:1em;">✏️</button>
            <button onclick="deleteSubject(${idx})" title="Delete" style="background:#ffe5e5; border:none; border-radius:6px; padding:6px 10px; cursor:pointer; color:#c53030; font-size:1em;">🗑️</button>
          </div>
        </div>
      </div>
    `;
  });
}
document.getElementById("subjectForm").onsubmit = function (e) {
  e.preventDefault();
  const subjects = getSubjects();
  const subj = {
    name: subjectName.value,
    code: subjectCode.value,
    total: totalHours.value,
    lecture: lectureHours.value,
    lab: labHours.value,
    faculty: assignedFaculty.value,
    semester: subjectSemester.value,
  };
  if (editSubjectIdx !== null) {
    subjects[editSubjectIdx] = subj;
    editSubjectIdx = null;
  } else {
    subjects.push(subj);
  }
  setSubjects(subjects);
  this.reset();
  renderSubjects();
};
let editSubjectIdx = null;
window.editSubject = function (idx) {
  const subjects = getSubjects();
  const subj = subjects[idx];
  subjectName.value = subj.name;
  subjectCode.value = subj.code;
  totalHours.value = subj.total;
  lectureHours.value = subj.lecture;
  labHours.value = subj.lab;
  assignedFaculty.value = subj.faculty;
  subjectSemester.value = subj.semester;
  editSubjectIdx = idx;
};
window.deleteSubject = function (idx) {
  const subjects = getSubjects();
  subjects.splice(idx, 1);
  setSubjects(subjects);
  renderSubjects();
};

// Faculty Data Management
function getFaculty() {
  return JSON.parse(localStorage.getItem("faculty") || "[]");
}
function setFaculty(faculty) {
  localStorage.setItem("faculty", JSON.stringify(faculty));
}
function renderFaculty() {
  const facultyList = document.getElementById("facultyList");
  const facultyArr = getFaculty();
  facultyList.innerHTML = facultyArr.length === 0 ? '<p style="color:#888">No faculty added yet.</p>' : "";
  facultyArr.forEach((fac, idx) => {
    facultyList.innerHTML += `
      <div class="faculty-card" style="position:relative; margin-bottom:16px; background:#fff; border-radius:10px; box-shadow:0 2px 8px rgba(0,0,0,0.04); padding:18px 20px;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-weight:700; font-size:1.1rem; color:#222;">${fac.name}</div>
            <div style="color:#555; font-size:0.95em; margin-top:2px;">Specialization: <b>${fac.specialization}</b> | Semester: <b>${fac.semester}</b></div>
            <div style="color:#666; font-size:0.93em; margin-top:2px;">Availability: ${fac.availability}</div>
          </div>
          <div style="display:flex; gap:8px;">
            <button onclick="editFaculty(${idx})" title="Edit" style="background:#f4f5f6; border:none; border-radius:6px; padding:6px 10px; cursor:pointer; color:#222; font-size:1em;">✏️</button>
            <button onclick="deleteFaculty(${idx})" title="Delete" style="background:#ffe5e5; border:none; border-radius:6px; padding:6px 10px; cursor:pointer; color:#c53030; font-size:1em;">🗑️</button>
          </div>
        </div>
      </div>
    `;
  });
}
document.getElementById("facultyForm").onsubmit = function (e) {
  e.preventDefault();
  const facultyArr = getFaculty();
  const fac = {
    name: facultyName.value,
    specialization: facultySpecialization.value,
    availability: facultyAvailability.value,
    semester: facultySemester.value,
  };
  if (editFacultyIdx !== null) {
    facultyArr[editFacultyIdx] = fac;
    editFacultyIdx = null;
  } else {
    facultyArr.push(fac);
  }
  setFaculty(facultyArr);
  this.reset();
  renderFaculty();
};
let editFacultyIdx = null;
window.editFaculty = function (idx) {
  const facultyArr = getFaculty();
  const fac = facultyArr[idx];
  facultyName.value = fac.name;
  facultySpecialization.value = fac.specialization;
  facultyAvailability.value = fac.availability;
  facultySemester.value = fac.semester;
  editFacultyIdx = idx;
};
window.deleteFaculty = function (idx) {
  const facultyArr = getFaculty();
  facultyArr.splice(idx, 1);
  setFaculty(facultyArr);
  renderFaculty();
};
