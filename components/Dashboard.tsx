
import React from 'react';
import { Student } from '../types';
import { OG_LEVELS } from '../constants';
import AddStudentForm from './AddStudentForm';
import { UserGroupIcon, ChevronRightIcon } from './Icons';

interface DashboardProps {
  students: Student[];
  onSelectStudent: (studentId: string) => void;
  isAddingStudent: boolean;
  setIsAddingStudent: (isAdding: boolean) => void;
  onAddStudent: (name: string, level: number, tutoringDays: string[]) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ students, onSelectStudent, isAddingStudent, setIsAddingStudent, onAddStudent }) => {

  const calculateProgress = (student: Student) => {
    const levelSkills = student.levelProgress[student.currentLevel];
    if (!levelSkills || levelSkills.length === 0) return 0;
    const masteredSkills = levelSkills.filter(skill => skill.isMastered).length;
    return Math.round((masteredSkills / levelSkills.length) * 100);
  };

  return (
    <div>
        {isAddingStudent && (
            <AddStudentForm onAddStudent={onAddStudent} onCancel={() => setIsAddingStudent(false)} />
        )}
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-slate-700 mb-6 flex items-center gap-3">
                <UserGroupIcon className="w-8 h-8 text-sky-600" />
                Student Dashboard
            </h2>

            {students.length === 0 ? (
                <div className="text-center py-10 px-6 bg-slate-50 rounded-lg">
                    <p className="text-slate-500">No students found.</p>
                    <p className="text-slate-500 mt-2">Click "Add Student" to get started.</p>
                </div>
            ) : (
                <div className="space-y-4">
                {students.map(student => (
                    <div 
                        key={student.id}
                        onClick={() => onSelectStudent(student.id)}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-lg shadow-sm hover:shadow-md hover:bg-sky-50 transition-all cursor-pointer border border-transparent hover:border-sky-300"
                    >
                        <div>
                            <p className="font-semibold text-lg text-slate-800">{student.name}</p>
                            <p className="text-sm text-slate-500">Level {student.currentLevel}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-32 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <p className="text-sm font-medium text-slate-600">{calculateProgress(student)}%</p>
                                    <div className="w-20 bg-slate-200 rounded-full h-2.5">
                                        <div 
                                            className="bg-green-500 h-2.5 rounded-full" 
                                            style={{ width: `${calculateProgress(student)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            <ChevronRightIcon className="w-6 h-6 text-slate-400" />
                        </div>
                    </div>
                ))}
                </div>
            )}
        </div>
    </div>
  );
};

export default Dashboard;
