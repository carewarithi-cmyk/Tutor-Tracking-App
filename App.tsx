
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
        info: '',
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
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
                <div 
                  className="flex items-center gap-2 cursor-pointer group" 
                  onClick={handleGoToDashboard}
                >
                  <div className="w-10 h-10 bg-gradient-to-tr from-sky-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
                    <span className="text-white font-black text-xl">OG</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-sky-700 to-indigo-700 tracking-tight">
                    Tracker
                  </h1>
                </div>
                {!selectedStudent && (
                    <button
                        onClick={() => setIsAddingStudent(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-sky-600 text-white font-bold rounded-full shadow-lg shadow-sky-200 hover:bg-sky-700 hover:shadow-xl transition-all active:scale-95"
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
      <footer className="text-center py-12 text-slate-400 text-xs font-medium uppercase tracking-widest">
        <p>Made for Educational Success &bull; Data Local to Browser</p>
      </footer>
    </div>
  );
};

export default App;
