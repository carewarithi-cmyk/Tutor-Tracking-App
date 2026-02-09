
import React, { useState } from 'react';
import { OG_LEVELS } from '../constants';

interface AddStudentFormProps {
  onAddStudent: (name: string, level: number, tutoringDays: string[]) => void;
  onCancel: () => void;
}

const AddStudentForm: React.FC<AddStudentFormProps> = ({ onAddStudent, onCancel }) => {
  const [name, setName] = useState('');
  const [level, setLevel] = useState(1);
  const [tutoringDays, setTutoringDays] = useState<string[]>([]);
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


  const handleDayChange = (day: string) => {
    setTutoringDays(prev => 
        prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddStudent(name.trim(), level, tutoringDays);
      setName('');
      setLevel(1);
      setTutoringDays([]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md relative">
        <h3 className="text-2xl font-bold text-slate-700 mb-6">Add New Student</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="student-name" className="block text-sm font-medium text-slate-600 mb-1">Student Name</label>
            <input
              id="student-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Jane Doe"
              className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
              required
            />
          </div>
          <div>
            <label htmlFor="start-level" className="block text-sm font-medium text-slate-600 mb-1">Starting Level</label>
            <select
              id="start-level"
              value={level}
              onChange={(e) => setLevel(parseInt(e.target.value))}
              className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
            >
              {Object.keys(OG_LEVELS).map(levelKey => (
                <option key={levelKey} value={levelKey}>
                  Level {levelKey}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Tutoring Days</label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {daysOfWeek.map(day => (
                    <label key={day} className="flex items-center space-x-2 p-2 rounded-md border border-slate-200 has-[:checked]:bg-sky-100 has-[:checked]:border-sky-300 transition-colors cursor-pointer">
                        <input
                            type="checkbox"
                            checked={tutoringDays.includes(day)}
                            onChange={() => handleDayChange(day)}
                            className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                        />
                        <span className="text-sm">{day.substring(0,3)}</span>
                    </label>
                ))}
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onCancel} className="px-4 py-2 bg-slate-200 text-slate-800 font-semibold rounded-lg hover:bg-slate-300 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 transition-colors">
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentForm;
