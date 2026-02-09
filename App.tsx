
import React, { useState, useCallback, useMemo } from 'react';
import { Student } from './types';
import { OG_LEVELS } from './constants';
import useLocalStorage from './hooks/useLocalStorage';
import Dashboard from './components/Dashboard';
import StudentView from './components/StudentView';
import { PlusCircleIcon } from './components/Icons';

const App: React.FC = () => {
  const [students, setStudents] = useLocalStorage<Student[]>('og-students', []);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [isAddingStudent, setIsAddingStudent] = useState<boolean>(false);

  const handleAddStudent = (name: string, level: number, tutoringDays: string[]) => {
    const newStudent: Student = {
      id: new Date().toISOString(),
      name,
      currentLevel: level,
      levelProgress: {},
      lessonLogs: [],
      tutoringDays,
    };
    
    // Initialize progress for all levels
    Object.keys(OG_LEVELS).forEach(levelKey => {
      const levelNum = parseInt(levelKey);
      newStudent.levelProgress[levelNum] = OG_LEVELS[levelNum].map(skill => ({
        skill,
        isMastered: false,
        repeatCount: 0,
      }));
    });

    setStudents(prev => [...prev, newStudent]);
    setIsAddingStudent(false);
  };

  const handleSelectStudent = (studentId: string) => {
    setSelectedStudentId(studentId);
  };

  const handleUpdateStudent = useCallback((updatedStudent: Student) => {
    setStudents(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
  }, [setStudents]);

  const selectedStudent = useMemo(() => {
    return students.find(s => s.id === selectedStudentId) || null;
  }, [students, selectedStudentId]);

  const handleGoToDashboard = () => {
    setSelectedStudentId(null);
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
                <h1 className="text-2xl sm:text-3xl font-bold text-sky-700 tracking-tight cursor-pointer" onClick={handleGoToDashboard}>
                  Orton-Gillingham Tracker
                </h1>
                {!selectedStudent && (
                    <button
                        onClick={() => setIsAddingStudent(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75 transition-colors"
                    >
                        <PlusCircleIcon className="w-5 h-5" />
                        <span className="hidden sm:inline">Add Student</span>
                    </button>
                )}
            </div>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {selectedStudent ? (
          <StudentView 
            student={selectedStudent}
            onUpdateStudent={handleUpdateStudent}
            onBack={handleGoToDashboard}
          />
        ) : (
          <Dashboard 
            students={students} 
            onSelectStudent={handleSelectStudent}
            isAddingStudent={isAddingStudent}
            setIsAddingStudent={setIsAddingStudent}
            onAddStudent={handleAddStudent}
          />
        )}
      </main>
      <footer className="text-center py-4 text-slate-500 text-sm">
        <p>Built for Tutors. Data saved locally in your browser.</p>
      </footer>
    </div>
  );
};

export default App;
