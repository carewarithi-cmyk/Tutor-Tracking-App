
import React, { useState } from 'react';
import { Student, GlobalSettings, QuickLink } from '../types';
import { ChevronDownIcon, ChevronUpIcon, PlusIcon, XMarkIcon } from './Icons';

interface GlobalRemindersProps {
  students: Student[];
  settings: GlobalSettings;
  onUpdateSettings: (settings: GlobalSettings) => void;
}

const CollapsibleSection: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-slate-200">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 text-left"
            >
                <h4 className="font-bold text-slate-700">{title}</h4>
                {isOpen ? <ChevronUpIcon className="w-5 h-5 text-slate-500" /> : <ChevronDownIcon className="w-5 h-5 text-slate-500" />}
            </button>
            {isOpen && <div className="p-4 pt-0">{children}</div>}
        </div>
    );
};

const GlobalReminders: React.FC<GlobalRemindersProps> = ({ students, settings, onUpdateSettings }) => {
    const [newLinkTitle, setNewLinkTitle] = useState('');
    const [newLinkUrl, setNewLinkUrl] = useState('');

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const todayName = daysOfWeek[today.getDay()];
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowName = daysOfWeek[tomorrow.getDay()];

    const todayStudents = students.filter(s => s.tutoringDays?.includes(todayName));
    const tomorrowStudents = students.filter(s => s.tutoringDays?.includes(tomorrowName));

    const handleAddLink = (e: React.FormEvent) => {
        e.preventDefault();
        if (newLinkTitle.trim() && newLinkUrl.trim()) {
            // Basic URL validation
            let url = newLinkUrl.trim();
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'https://' + url;
            }

            const newLink: QuickLink = {
                id: new Date().toISOString(),
                title: newLinkTitle.trim(),
                url: url,
            };
            onUpdateSettings({ ...settings, quickLinks: [...settings.quickLinks, newLink] });
            setNewLinkTitle('');
            setNewLinkUrl('');
        }
    };

    const handleDeleteLink = (linkId: string) => {
        onUpdateSettings({
            ...settings,
            quickLinks: settings.quickLinks.filter(link => link.id !== linkId),
        });
    };

    const StudentListItem: React.FC<{ student: Student }> = ({ student }) => (
        <li className="py-2">
            <p className="text-sm text-slate-800 font-bold">{student.name} <span className="font-medium text-slate-500">(Lvl {student.currentLevel})</span></p>
            <p className="text-xs text-slate-600 pl-2">Next: {student.nextLessonFocus || '—'}</p>
        </li>
    );

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 sticky top-28">
            <CollapsibleSection title="Today" defaultOpen={true}>
                <div className="space-y-4">
                    <textarea
                        value={settings.todayPlan}
                        onChange={(e) => onUpdateSettings({ ...settings, todayPlan: e.target.value })}
                        rows={3}
                        placeholder="Today's plan, reminders..."
                        className="w-full p-2 text-sm border border-slate-200 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                    />
                    <div>
                        <h5 className="text-sm font-bold text-slate-600 mb-1">Students Scheduled Today:</h5>
                        {todayStudents.length > 0 ? (
                             <ul className="divide-y divide-slate-100">
                                {todayStudents.map(s => <StudentListItem key={s.id} student={s} />)}
                            </ul>
                        ) : (
                            <p className="text-xs text-slate-500 italic py-2">No students scheduled for today.</p>
                        )}
                    </div>
                </div>
            </CollapsibleSection>
            
            <CollapsibleSection title="Tomorrow">
                <div className="space-y-4">
                    <textarea
                        value={settings.tomorrowPlan}
                        onChange={(e) => onUpdateSettings({ ...settings, tomorrowPlan: e.target.value })}
                        rows={3}
                        placeholder="Tomorrow's plan..."
                        className="w-full p-2 text-sm border border-slate-200 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                    />
                     <div>
                        <h5 className="text-sm font-bold text-slate-600 mb-1">Students Scheduled Tomorrow:</h5>
                         {tomorrowStudents.length > 0 ? (
                             <ul className="divide-y divide-slate-100">
                                {tomorrowStudents.map(s => <StudentListItem key={s.id} student={s} />)}
                            </ul>
                        ) : (
                            <p className="text-xs text-slate-500 italic py-2">No students scheduled for tomorrow.</p>
                        )}
                    </div>
                </div>
            </CollapsibleSection>

            <CollapsibleSection title="Quick Links" defaultOpen={true}>
                <div className="space-y-3">
                    {settings.quickLinks.length > 0 ? (
                        <ul className="space-y-2">
                           {settings.quickLinks.map(link => (
                               <li key={link.id} className="flex items-center justify-between group">
                                   <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-sky-600 hover:underline truncate" title={link.url}>
                                       {link.title}
                                   </a>
                                   <button onClick={() => handleDeleteLink(link.id)} className="p-1 opacity-0 group-hover:opacity-100 transition-opacity" aria-label={`Delete ${link.title}`}>
                                       <XMarkIcon className="w-4 h-4 text-red-500 hover:text-red-700" />
                                   </button>
                               </li>
                           ))}
                        </ul>
                    ) : (
                        <p className="text-xs text-slate-500 italic">No links saved yet.</p>
                    )}
                    <form onSubmit={handleAddLink} className="space-y-2 border-t border-slate-200 pt-3">
                         <input
                            type="text"
                            value={newLinkTitle}
                            onChange={(e) => setNewLinkTitle(e.target.value)}
                            placeholder="Link Title"
                            required
                            className="w-full text-sm p-1.5 border border-slate-200 rounded-md focus:ring-sky-500 focus:border-sky-500"
                        />
                        <div className="flex items-center gap-2">
                            <input
                                type="url"
                                value={newLinkUrl}
                                onChange={(e) => setNewLinkUrl(e.target.value)}
                                placeholder="https://example.com"
                                required
                                className="w-full text-sm p-1.5 border border-slate-200 rounded-md focus:ring-sky-500 focus:border-sky-500"
                            />
                            <button type="submit" className="p-1.5 bg-sky-600 text-white rounded-md hover:bg-sky-700" aria-label="Add new link">
                                <PlusIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </form>
                </div>
            </CollapsibleSection>
        </div>
    );
};

export default GlobalReminders;
