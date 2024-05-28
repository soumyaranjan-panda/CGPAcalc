import React from 'react';
import GradeTable from './GradeTable';
import GradeCalculation from './GradeCalculation';

const GradeSheet = () => {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Student Grade Sheet</h1>
        <GradeTable />
        <GradeCalculation />
        <div className='w-full text-center'>
          Developed by
          <a href='https://github.com/soumyaranjan-panda' className='text-blue-700'> Soumyaranjan Panda</a>
        </div>
      </div>
    );
  };
  
export default GradeSheet;
