import React, { useState } from "react";
const GradeCalculation = () => {
  const [semesters, setSemesters] = useState([]);
  const [cgpa, setCgpa] = useState(0);
  const [percent, setPercent] = useState(0);
  const gradeToPoint = (grade) => {
    const gradeMap = {
      O: 10,
      E: 9,
      A: 8,
      B: 7,
      C: 6,
      D: 5,
      F: 2,
      M: 0,
      S: 0,
    };
    return gradeMap[grade] || 0;
  };
  const calculateSGPA = (semester) => {
    let totalCredits = semester.reduce(
      (acc, subject) => acc + subject.credits,
      0
    );
    let totalPoints = semester.reduce(
      (acc, subject) => acc + gradeToPoint(subject.grade) * subject.credits,
      0
    );
    return (totalPoints / totalCredits).toFixed(2);
  };
  const calculateCGPA = (semesters) => {
    let totalCredits = 0;
    let totalPoints = 0;
    semesters.forEach((semester) => {
      let semesterCredits = semester.reduce(
        (acc, subject) => acc + subject.credits,
        0
      );
      let semesterPoints = semester.reduce(
        (acc, subject) => acc + gradeToPoint(subject.grade) * subject.credits,
        0
      );
      totalCredits += semesterCredits;
      totalPoints += semesterPoints;
    });
    return (totalPoints / totalCredits).toFixed(2);
  };
  const handleInputChange = (e, semesterIndex, subjectIndex, field) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIndex][subjectIndex][field] =
      field === "credits" ? parseFloat(e.target.value) : e.target.value;
    setSemesters(updatedSemesters);
  };
  const handleAddSemester = () => {
    const numSubjects = prompt(
      "Enter the number of subjects for this semester:"
    );
    if (!isNaN(numSubjects) && numSubjects > 0) {
      const semester = Array.from({ length: parseInt(numSubjects) }, () => ({
        credits: 0,
        grade: "O",
      }));
      setSemesters([...semesters, semester]);
    }
  };
  const handleMinimizeSemester = (semesterIndex) => {
    handleCalculateSGPA(semesterIndex)
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIndex].minimized = true;
    setSemesters(updatedSemesters);
  };
  const handleMaximizeSemester = (semesterIndex) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIndex].minimized = false;
    setSemesters(updatedSemesters);
  };
  const handleCalculateSGPA = (semesterIndex) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIndex].sgpa = calculateSGPA(
      updatedSemesters[semesterIndex]
    );
    setSemesters(updatedSemesters);
  };
  const handleCalculateCGPA = () => {
    let a = calculateCGPA(semesters);
    setCgpa(a);
    setPercent((a - 0.5) * 10);
  };
  return (
    <div className="container mx-auto p-4 ">
      <div className="flex justify-between flex-col gap-3">
        <h2 className="text-xl font-bold mb-4">GPA Calculation</h2>
        <div className="mb-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={handleAddSemester}
          >
            Add Semester
          </button>
        </div>
        <div className="bg-blue-50 mx-full p-2 rounded space-y-2">
          {semesters.map((semester, semesterIndex) => (
            <div key={semesterIndex} className=" bg-blue-100 p-0.5 rounded-sm">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold">
                  Semester {semesterIndex + 1}
                </h3>
                {!semester.minimized ? (
                  <button
                    className="bg-blue-500 text-white py-1 px-2 rounded text-xs"
                    onClick={() => handleMinimizeSemester(semesterIndex)}
                  >
                    Minimize
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 text-white py-1 px-2 rounded text-xs"
                    onClick={() => handleMaximizeSemester(semesterIndex)}
                  >
                    Maximize
                  </button>
                )}
              </div>
              {!semester.minimized && (
                <div className="mx-2">
                  {semester.map((subject, subjectIndex) => (
                    <div key={subjectIndex} className="flex space-x-2">
                      <div className="w-1/2">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Credits for Subject {subjectIndex + 1}:
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          pattern="[0-9]+(\.[0-9]+)?"
                          className="block w-full border-gray-300 rounded-md shadow-sm px-2 py-1"
                          value={subject.credits || ""}
                          value={subject.credits || "0"}
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              semesterIndex,
                              subjectIndex,
                              "credits"
                            )
                          }
                        />
                      </div>
                      <div className="w-1/2">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Grade for Subject {subjectIndex + 1}:
                        </label>
                        <select
                          className="block w-full border-gray-300 rounded-md shadow-sm px-2 py-1"
                          value={subject.grade || ""}
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              semesterIndex,
                              subjectIndex,
                              "grade"
                            )
                          }
                        >
                          <option value="O">O</option>
                          <option value="E">E</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                          <option value="D">D</option>
                          <option value="F">F</option>
                          <option value="M">M</option>
                          <option value="S">S</option>
                        </select>
                      </div>
                    </div>
                  ))}
                  <div className="mt-2">
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded"
                      onClick={() => handleCalculateSGPA(semesterIndex)}
                    >
                      Calculate SGPA
                    </button>
                    {semester.sgpa && (
                      <span className="ml-2">SGPA: {semester.sgpa}</span>
                    )}
                  </div>
                </div>
              )}
              {semester.minimized && (
                <div className="mt-2">
                  {semester.sgpa && (
                    <span className="ml-2">SGPA: {semester.sgpa}</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <div>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded"
            onClick={handleCalculateCGPA}
          >
            Calculate CGPA
          </button>
          {
            <div className="ml-2 flex flex-col m-2 text-md">
              <span>CGPA: {cgpa}</span>
              <span>Percentage: {percent}</span>
            </div>
          }
        </div>
      </div>
    </div>
  );
};
export default GradeCalculation;