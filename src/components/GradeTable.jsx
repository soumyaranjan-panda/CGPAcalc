import React from 'react';

const GradeTable = () => {
  const grades = [
    { grade: 'O', description: 'Outstanding', percentage: '90 & above upto 100', points: 10 },
    { grade: 'E', description: 'Excellent', percentage: '80 & above but less than 90', points: 9 },
    { grade: 'A', description: 'Very Good', percentage: '70 & above but less than 80', points: 8 },
    { grade: 'B', description: 'Good', percentage: '60 & above but less than 70', points: 7 },
    { grade: 'C', description: 'Fair', percentage: '50 & above but less than 60', points: 6 },
    { grade: 'D', description: 'Below Average', percentage: '37 & above but less than 50', points: 5 },
    { grade: 'F', description: 'Failed', percentage: 'Below 37', points: 0 },
    { grade: 'M', description: 'Malpractice', percentage: '-', points: 2 },
    { grade: 'S', description: 'Absent', percentage: '-', points: 0 },
  ];

  return (
    <div className="container mx-auto p-4 overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Grading System</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-2 sm:px-4 border-b">Grade</th> {/* Adjusted padding for small screens */}
            <th className="py-2 px-2 sm:px-4 border-b">Description</th> {/* Adjusted padding for small screens */}
            <th className="py-2 px-2 sm:px-4 border-b">Percentage</th> {/* Adjusted padding for small screens */}
            <th className="py-2 px-2 sm:px-4 border-b">Points</th> {/* Adjusted padding for small screens */}
          </tr>
        </thead>
        <tbody>
          {grades.map((grade) => (
            <tr key={grade.grade}>
              <td className="py-2 px-2 sm:px-4 border-b text-center">{grade.grade}</td> {/* Adjusted padding and centered text for small screens */}
              <td className="py-2 px-2 sm:px-4 border-b">{grade.description}</td> {/* Adjusted padding for small screens */}
              <td className="py-2 px-2 sm:px-4 border-b text-center">{grade.percentage}</td> {/* Adjusted padding and centered text for small screens */}
              <td className="py-2 px-2 sm:px-4 border-b text-center">{grade.points}</td> {/* Adjusted padding and centered text for small screens */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradeTable;
