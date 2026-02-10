
import React from 'react';
import { Student, GlobalSettings } from '../types';
import { OG_LEVELS } from '../constants';
import AddStudentForm from './AddStudentForm';
import GlobalReminders from './GlobalReminders';
import { UserGroupIcon, ChevronRightIcon, SparklesIcon, PlusCircleIcon } from './Icons';

interface DashboardProps {
  students: Student[];
  onSelectStudent: (studentId: string) => void;
  isAddingStudent: boolean;
  setIsAddingStudent: (isAdding: boolean) => void;
  onAddStudent: (name: string, level: number, tutoringDays: string[]) => void;
  globalSettings: GlobalSettings;
  onUpdateGlobalSettings: (settings: GlobalSettings) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ students, onSelectStudent, isAddingStudent, setIsAddingStudent, onAddStudent, globalSettings, onUpdateGlobalSettings }) => {

  const calculateProgress = (student: Student) => {
    const levelSkills = student.levelProgress[student.currentLevel];
    if (!levelSkills || levelSkills.length === 0) return 0;
    const masteredSkills = levelSkills.filter(skill => skill.isMastered).length;
    return Math.round((masteredSkills / levelSkills.length) * 100);
  };

  return (
    <div className="space-y-6">
        {isAddingStudent && (
            <AddStudentForm onAddStudent={onAddStudent} onCancel={() => setIsAddingStudent(false)} />
        )}
        
        {/* Colorful Hero Banner */}
        <div className="relative overflow-hidden bg-gradient-to-br from-sky-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl mb-8">
            <div className="relative z-10 max-w-2xl">
                <div className="flex items-center gap-2 mb-3">
                    <SparklesIcon className="w-6 h-6 text-yellow-300 animate-pulse" />
                    <span className="text-sky-100 font-semibold tracking-wider uppercase text-sm">Orton-Gillingham Hub</span>
                </div>
                <h2 className="text-4xl font-extrabold mb-4 leading-tight">Welcome back, <br/>Inspiring Minds!</h2>
                <p className="text-sky-100 text-lg mb-6 max-w-md">Track your students' journey through literacy levels with ease and focus.</p>
                <button
                    onClick={() => setIsAddingStudent(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 font-bold rounded-full shadow-lg hover:bg-sky-50 transition-all transform hover:-translate-y-1"
                >
                    <PlusCircleIcon className="w-5 h-5" />
                    Add a New Student
                </button>
            </div>
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 mr-12 mb-12 w-48 h-48 bg-sky-300 opacity-20 rounded-full blur-2xl"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                        <UserGroupIcon className="w-6 h-6 text-sky-500" />
                        Student Directory
                    </h3>
                    <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                        {students.length} Total {students.length === 1 ? 'Student' : 'Students'}
                    </span>
                </div>

                {students.length === 0 ? (
                    <div className="text-center py-16 px-6 bg-gradient-to-b from-slate-50 to-white rounded-2xl border-2 border-dashed border-slate-200">
                        <div className="w-20 h-20 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <UserGroupIcon className="w-10 h-10" />
                        </div>
                        <p className="text-xl font-bold text-slate-700">Ready to start tracking?</p>
                        <p className="text-slate-500 mt-2 max-w-xs mx-auto">Add your first student to begin monitoring their progress through the OG levels.</p>
                        <button 
                            onClick={() => setIsAddingStudent(true)}
                            className="mt-6 text-sky-600 font-bold hover:underline"
                        >
                            Click here to create your first student profile
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {students.map(student => {
                        const progress = calculateProgress(student);
                        const hasSnapshot = student.quickNote || student.lastLessonFocus || student.nextLessonFocus;
                        return (
                            <div 
                                key={student.id}
                                onClick={() => onSelectStudent(student.id)}
                                className="group flex flex-col p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-sky-200 transition-all cursor-pointer relative overflow-hidden"
                            >
                                {/* Accent line */}
                                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-sky-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <p className="font-bold text-xl text-slate-800 group-hover:text-sky-700 transition-colors">{student.name}</p>
                                        <p className="text-sm font-semibold text-sky-500">Level {student.currentLevel}</p>
                                    </div>
                                    <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-sky-100 transition-colors">
                                        <ChevronRightIcon className="w-5 h-5 text-slate-400 group-hover:text-sky-600" />
                                    </div>
                                </div>

                                {student.currentBook && (
                                    <p className="text-sm text-slate-600 mb-4">
                                        📚 Reading: <span className="font-medium">{student.currentBook}</span>
                                    </p>
                                )}
                                
                                <div className="flex-grow space-y-4">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Progress</p>
                                            <p className="text-sm font-black text-slate-800">{progress}%</p>
                                        </div>
                                        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                                            <div 
                                                className="bg-gradient-to-r from-sky-400 to-emerald-400 h-full rounded-full transition-all duration-1000 ease-out" 
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {hasSnapshot && (
                                        <div className="border-t border-slate-100 pt-3 space-y-1 text-xs text-slate-600">
                                            {student.quickNote && <p className="truncate"><strong>Note:</strong> {student.quickNote}</p>}
                                            {student.lastLessonFocus && <p className="truncate"><strong>Last:</strong> {student.lastLessonFocus}</p>}
                                            {student.nextLessonFocus && <p className="truncate"><strong>Next:</strong> {student.nextLessonFocus}</p>}
                                        </div>
                                    )}
                                </div>

                                {student.tutoringDays && student.tutoringDays.length > 0 && (
                                    <div className="flex flex-wrap gap-1 pt-4 mt-auto">
                                        {student.tutoringDays.map(day => (
                                            <span key={day} className="text-[10px] px-2 py-0.5 bg-indigo-50 text-indigo-600 font-bold rounded-md uppercase">
                                                {day.substring(0,3)}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    </div>
                )}
            </div>

            <div className="lg:col-span-1">
                <GlobalReminders
                    students={students}
                    settings={globalSettings}
                    onUpdateSettings={onUpdateGlobalSettings}
                />
            </div>
        </div>
    </div>
  );
};

export default Dashboard;