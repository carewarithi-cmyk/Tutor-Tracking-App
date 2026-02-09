
import React, { useState, useEffect } from 'react';
import { Student, SkillStatus, LessonLog } from '../types';
import { OG_LEVELS } from '../constants';
import { ArrowLeftIcon, BookOpenIcon, ClockIcon, PlusIcon, MinusIcon, CheckCircleIcon, SparklesIcon, DocumentTextIcon, ChevronUpIcon, ChevronDownIcon, PencilIcon } from './Icons';

interface StudentViewProps {
  student: Student;
  onUpdateStudent: (student: Student) => void;
  onBack: () => void;
}

const SkillItem: React.FC<{
  skillStatus: SkillStatus;
  isFocused: boolean;
  onUpdate: (updatedSkill: SkillStatus) => void;
  onMaster: (skillName: string) => void;
  onUnmaster: (skillName: string) => void;
  onFocus: () => void;
}> = ({ skillStatus, isFocused, onUpdate, onMaster, onUnmaster, onFocus }) => {
  const handleRepeatChange = (delta: number) => {
    const newCount = Math.max(0, skillStatus.repeatCount + delta);
    onUpdate({ ...skillStatus, repeatCount: newCount });
  };

  const itemBg = skillStatus.isMastered ? 'bg-green-100 border-green-200' : isFocused ? 'bg-sky-50 border-sky-200' : 'bg-white border-slate-200 hover:bg-slate-50';
  const textColor = skillStatus.isMastered ? 'text-green-800' : 'text-slate-700';

  return (
    <div 
      onClick={onFocus}
      className={`p-3 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all cursor-pointer ${itemBg}`}
    >
      <div className="flex items-center gap-3 flex-grow">
        {skillStatus.isMastered && <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />}
        {isFocused && <SparklesIcon className="w-5 h-5 text-sky-500 flex-shrink-0 animate-pulse" />}
        <span className={`font-medium capitalize ${textColor}`}>{skillStatus.skill}</span>
      </div>
      <div className="flex items-center gap-4 justify-end">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">Repeats:</span>
          <button onClick={(e) => { e.stopPropagation(); handleRepeatChange(-1); }} className="p-1 rounded-full bg-slate-200 hover:bg-slate-300 disabled:opacity-50" disabled={skillStatus.isMastered}>
            <MinusIcon className="w-4 h-4"/>
          </button>
          <span className="font-semibold w-5 text-center">{skillStatus.repeatCount}</span>
          <button onClick={(e) => { e.stopPropagation(); handleRepeatChange(1); }} className="p-1 rounded-full bg-slate-200 hover:bg-slate-300 disabled:opacity-50" disabled={skillStatus.isMastered}>
            <PlusIcon className="w-4 h-4"/>
          </button>
        </div>
        
        {skillStatus.isMastered ? (
          <button 
            onClick={(e) => { e.stopPropagation(); onUnmaster(skillStatus.skill); }}
            className="px-3 py-1.5 text-sm font-semibold text-white bg-amber-500 rounded-md shadow-sm hover:bg-amber-600 transition-colors"
          >
            Not Mastered
          </button>
        ) : (
          <button 
            onClick={(e) => { e.stopPropagation(); onMaster(skillStatus.skill); }}
            disabled={!isFocused}
            className="px-3 py-1.5 text-sm font-semibold text-white bg-green-500 rounded-md shadow-sm hover:bg-green-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
          >
            Mastered
          </button>
        )}
      </div>
    </div>
  );
};


const StudentView: React.FC<StudentViewProps> = ({ student, onUpdateStudent, onBack }) => {
  const [lessonDate, setLessonDate] = useState(new Date().toISOString().split('T')[0]);
  const [lessonNotes, setLessonNotes] = useState('');
  const [showLogs, setShowLogs] = useState(false);
  const [focusedSkill, setFocusedSkill] = useState<string | null>(null);
  
  const [isEditingDays, setIsEditingDays] = useState(false);
  const [editedDays, setEditedDays] = useState<string[]>(student.tutoringDays || []);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  useEffect(() => {
    // Set initial focus to the first unmastered skill when loading a student or switching levels
    const currentLevelSkills = student.levelProgress[student.currentLevel] || [];
    const firstUnmastered = currentLevelSkills.find(s => !s.isMastered);
    if (firstUnmastered) {
      setFocusedSkill(firstUnmastered.skill);
    }
  }, [student.id, student.currentLevel]);


  const handleDayChangeForEdit = (day: string) => {
    setEditedDays(prev => 
        prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleSaveDays = () => {
      onUpdateStudent({ ...student, tutoringDays: editedDays });
      setIsEditingDays(false);
  };

  const handleLevelChange = (newLevel: number) => {
    if (newLevel !== student.currentLevel) {
        setFocusedSkill(null);
        onUpdateStudent({ ...student, currentLevel: newLevel });
    }
  }

  const handleSkillUpdate = (updatedSkill: SkillStatus) => {
    const newProgress = [...student.levelProgress[student.currentLevel]];
    const skillIndex = newProgress.findIndex(s => s.skill === updatedSkill.skill);
    if (skillIndex > -1) {
      newProgress[skillIndex] = updatedSkill;
      onUpdateStudent({
        ...student,
        levelProgress: { ...student.levelProgress, [student.currentLevel]: newProgress }
      });
    }
  };

  const handleMasterSkill = (skillName: string) => {
    const newProgress = student.levelProgress[student.currentLevel].map(s => 
      s.skill === skillName ? { ...s, isMastered: true } : s
    );
    onUpdateStudent({
      ...student,
      levelProgress: { ...student.levelProgress, [student.currentLevel]: newProgress }
    });
  };

  const handleUnmasterSkill = (skillName: string) => {
    const newProgress = student.levelProgress[student.currentLevel].map(s => 
      s.skill === skillName ? { ...s, isMastered: false } : s
    );
    onUpdateStudent({
      ...student,
      levelProgress: { ...student.levelProgress, [student.currentLevel]: newProgress }
    });
  };

  const handleLogLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonNotes || !lessonDate) return;

    const dateParts = lessonDate.split('-').map(part => parseInt(part, 10));
    const selectedDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

    const newLog: LessonLog = {
      id: new Date().toISOString(),
      date: selectedDate.toISOString(),
      notes: lessonNotes,
    };
    
    onUpdateStudent({ ...student, lessonLogs: [newLog, ...student.lessonLogs] });
    setLessonDate(new Date().toISOString().split('T')[0]);
    setLessonNotes('');
  };

  const currentLevelSkills = student.levelProgress[student.currentLevel] || [];

  return (
    <div className="space-y-8">
      <div>
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-800 mb-4">
          <ArrowLeftIcon className="w-5 h-5"/>
          Back to Dashboard
        </button>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-3xl font-bold text-slate-800">{student.name}</h2>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Current Level:</span>
             <select 
                value={student.currentLevel}
                onChange={(e) => handleLevelChange(parseInt(e.target.value))}
                className="p-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
              >
                {Object.keys(OG_LEVELS).map(level => (
                    <option key={level} value={level}>
                        {level}
                    </option>
                ))}
              </select>
          </div>
        </div>
        <div className="mt-4 bg-slate-50 p-4 rounded-lg border">
            <div className="flex justify-between items-center">
                <h4 className="font-semibold text-slate-600">Tutoring Days</h4>
                <button onClick={() => { setIsEditingDays(!isEditingDays); setEditedDays(student.tutoringDays || []); }} className="text-sm font-semibold text-sky-600 hover:text-sky-800 flex items-center gap-1">
                    <PencilIcon className="w-4 h-4"/>
                    {isEditingDays ? 'Cancel' : 'Edit'}
                </button>
            </div>
            {isEditingDays ? (
                <div className="mt-2">
                    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                        {daysOfWeek.map(day => (
                            <label key={day} className="flex items-center justify-center space-x-2 p-2 rounded-md border border-slate-200 has-[:checked]:bg-sky-100 has-[:checked]:border-sky-300 transition-colors cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={editedDays.includes(day)}
                                    onChange={() => handleDayChangeForEdit(day)}
                                    className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                                />
                                <span>{day.substring(0,3)}</span>
                            </label>
                        ))}
                    </div>
                    <div className="text-right mt-4">
                        <button onClick={handleSaveDays} className="px-3 py-1.5 text-sm font-semibold text-white bg-sky-600 rounded-md shadow-sm hover:bg-sky-700">Save Changes</button>
                    </div>
                </div>
            ) : (
                <div className="mt-2 flex flex-wrap gap-2">
                    {(student.tutoringDays && student.tutoringDays.length > 0) ? student.tutoringDays.map(day => (
                        <span key={day} className="px-3 py-1 bg-sky-100 text-sky-800 text-sm font-medium rounded-full">{day}</span>
                    )) : <p className="text-sm text-slate-500">No tutoring days set.</p>}
                </div>
            )}
        </div>
      </div>

      {/* Skill Checklist */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-slate-700 mb-4 flex items-center gap-3">
          <BookOpenIcon className="w-7 h-7 text-sky-600" />
          Level {student.currentLevel} Skills
        </h3>
        <div className="space-y-2">
          {currentLevelSkills.map(skillStatus => {
            return (
              <SkillItem 
                key={skillStatus.skill} 
                skillStatus={skillStatus}
                isFocused={skillStatus.skill === focusedSkill}
                onUpdate={handleSkillUpdate}
                onMaster={handleMasterSkill}
                onUnmaster={handleUnmasterSkill}
                onFocus={() => setFocusedSkill(skillStatus.skill)}
              />
            );
          })}
        </div>
      </div>

      {/* Lesson Logger */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-slate-700 mb-4 flex items-center gap-3">
          <ClockIcon className="w-7 h-7 text-sky-600" />
          Lesson Logger
        </h3>
        <form onSubmit={handleLogLesson} className="space-y-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-slate-600 mb-1">Date</label>
            <input 
              type="date"
              id="date"
              value={lessonDate}
              onChange={e => setLessonDate(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
              required
            />
          </div>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-slate-600 mb-1">Lesson Notes</label>
            <textarea 
              id="notes"
              value={lessonNotes}
              onChange={e => setLessonNotes(e.target.value)}
              rows={4}
              className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
              placeholder="What did you work on today?"
              required
            />
          </div>
          <div className="text-right">
            <button type="submit" className="px-4 py-2 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75 transition-colors">
              Log Lesson
            </button>
          </div>
        </form>
      </div>

      {/* Lesson Log History */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <button onClick={() => setShowLogs(!showLogs)} className="w-full flex justify-between items-center text-left">
          <h3 className="text-xl font-bold text-slate-700 flex items-center gap-3">
            <DocumentTextIcon className="w-7 h-7 text-sky-600" />
            Lesson History ({student.lessonLogs.length})
          </h3>
          {showLogs ? <ChevronUpIcon className="w-6 h-6" /> : <ChevronDownIcon className="w-6 h-6" />}
        </button>
        {showLogs && (
          <div className="mt-4 space-y-4 max-h-96 overflow-y-auto pr-2">
            {student.lessonLogs.length > 0 ? student.lessonLogs.map(log => (
              <div key={log.id} className="p-4 border-l-4 border-sky-400 bg-slate-50 rounded-r-lg">
                <p className="font-semibold text-slate-700">{new Date(log.date).toLocaleDateString()}</p>
                <p className="text-slate-600 whitespace-pre-wrap mt-1">{log.notes}</p>
              </div>
            )) : <p className="text-slate-500">No lessons logged yet.</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentView;
