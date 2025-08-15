import React, { useState, useEffect } from 'react';
import { Task, Priority, Recurrence, Reminder } from '../types';
import Modal from './common/Modal';
import Button from './common/Button';
import Icon from './common/Icon';
import { useTranslation } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  projectId: string;
}

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ isOpen, onClose, task, projectId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [priority, setPriority] = useState<Priority>(Priority.MEDIUM);
  const [labels, setLabels] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrence, setRecurrence] = useState<Recurrence>({ type: 'daily', daysOfWeek: [], yearlyInterval: 1 });
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const { t } = useTranslation();
  const { saveTask } = useData();
  
  const WEEKDAYS = [
    t('weekdays.sun'), t('weekdays.mon'), t('weekdays.tue'), 
    t('weekdays.wed'), t('weekdays.thu'), t('weekdays.fri'), t('weekdays.sat')
  ];


  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      if (task.dueDate) {
          const date = new Date(task.dueDate);
          setDueDate(date.toISOString().split('T')[0]);
          setDueTime(date.toTimeString().slice(0,5));
      } else {
          setDueDate('');
          setDueTime('');
      }
      setPriority(task.priority);
      setLabels(task.labels?.join(', ') || '');
      setReminders(task.reminders || []);
      setIsRecurring(!!task.recurrence);
      if (task.recurrence) {
        setRecurrence({ yearlyInterval: 1, daysOfWeek: [], ...task.recurrence });
      }
    } else {
      // Reset form for new task
      setTitle('');
      setDescription('');
      setDueDate('');
      setDueTime('');
      setPriority(Priority.MEDIUM);
      setLabels('');
      setIsRecurring(false);
      setRecurrence({ type: 'daily', daysOfWeek: [], yearlyInterval: 1 });
      setReminders([]);
    }
  }, [task, isOpen, t]);
  
  const handleDayToggle = (dayIndex: number) => {
    const days = recurrence.daysOfWeek.includes(dayIndex)
      ? recurrence.daysOfWeek.filter(d => d !== dayIndex)
      : [...recurrence.daysOfWeek, dayIndex];
    setRecurrence({ ...recurrence, daysOfWeek: days.sort() });
  };
  
  const addReminder = () => setReminders([...reminders, { value: 10, unit: 'minutes', isBefore: true }]);
  const removeReminder = (index: number) => setReminders(reminders.filter((_, i) => i !== index));
  const updateReminder = (index: number, field: keyof Reminder, value: any) => {
      const newReminders = [...reminders];
      (newReminders[index] as any)[field] = value;
      setReminders(newReminders);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    let combinedDueDate: string | null = null;
    if (dueDate) {
        combinedDueDate = `${dueDate}${dueTime ? `T${dueTime}` : 'T00:00'}`;
    }
    
    const labelArray = labels.split(',').map(l => l.trim()).filter(l => l.length > 0);

    const savedTask: Partial<Task> & { projectId: string; title: string; } = {
      id: task?.id,
      title: title.trim(),
      description: description.trim(),
      dueDate: combinedDueDate,
      priority,
      projectId,
      labels: labelArray,
      recurrence: isRecurring ? recurrence : null,
      reminders: reminders,
      ...(task && { notificationsSent: task.notificationsSent, isComplete: task.isComplete }),
    };
    saveTask(savedTask);
    onClose();
  };
  
  const inputBaseClasses = "mt-1 block w-full border bg-white dark:bg-slate-800 border-slate-300 dark:border-dark-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-sans";
  const labelBaseClasses = "block text-sm font-medium text-slate-700 dark:text-slate-300";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={task ? t('taskModal.title.edit') : t('taskModal.title.add')}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className={labelBaseClasses}>{t('taskModal.field.title')}</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className={inputBaseClasses} required />
        </div>
        <div>
          <label htmlFor="description" className={labelBaseClasses}>{t('taskModal.field.description')}</label>
          <textarea id="description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className={inputBaseClasses} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="priority" className={labelBaseClasses}>{t('taskModal.field.priority')}</label>
            <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value as Priority)} className={inputBaseClasses}>
              <option value={Priority.LOW}>{t('taskItem.priority.low')}</option>
              <option value={Priority.MEDIUM}>{t('taskItem.priority.medium')}</option>
              <option value={Priority.HIGH}>{t('taskItem.priority.high')}</option>
            </select>
          </div>
           <div>
            <label htmlFor="labels" className={labelBaseClasses}>{t('taskModal.field.labels')}</label>
            <input type="text" id="labels" value={labels} onChange={(e) => setLabels(e.target.value)} className={inputBaseClasses} placeholder={t('taskModal.field.labelsPlaceholder')} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="dueDate" className={labelBaseClasses}>{t('taskModal.field.dueDate')}</label>
            <input type="date" id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className={inputBaseClasses} />
          </div>
           <div>
            <label htmlFor="dueTime" className={labelBaseClasses}>{t('taskModal.field.dueTime')}</label>
            <input type="time" id="dueTime" value={dueTime} onChange={(e) => setDueTime(e.target.value)} className={inputBaseClasses} />
          </div>
        </div>
        
        <div className="space-y-3 pt-2">
            <h4 className={`${labelBaseClasses} font-heading`}>{t('taskModal.recurrence.title')}</h4>
            <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={isRecurring} onChange={e => setIsRecurring(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /> {t('taskModal.recurrence.checkbox')}</label>
            </div>
            {isRecurring && (
                <div className="pl-6 space-y-3 animate-fade-in">
                    <div className="grid grid-cols-2 gap-4">
                        <select value={recurrence.type} onChange={e => setRecurrence({...recurrence, type: e.target.value as any})} className={inputBaseClasses}>
                            <option value="daily">{t('taskModal.recurrence.type.daily')}</option>
                            <option value="weekly">{t('taskModal.recurrence.type.weekly')}</option>
                            <option value="monthly">{t('taskModal.recurrence.type.monthly')}</option>
                            <option value="yearly">{t('taskModal.recurrence.type.yearly')}</option>
                        </select>
                        {recurrence.type === 'yearly' && (
                             <select value={recurrence.yearlyInterval} onChange={e => setRecurrence({...recurrence, yearlyInterval: parseInt(e.target.value, 10)})} className={inputBaseClasses}>
                                <option value="1">{t('taskModal.recurrence.yearly.everyYear')}</option>
                                <option value="2">{t('taskModal.recurrence.yearly.every2Years')}</option>
                                <option value="3">{t('taskModal.recurrence.yearly.every3Years')}</option>
                                <option value="5">{t('taskModal.recurrence.yearly.every5Years')}</option>
                            </select>
                        )}
                    </div>
                    {recurrence.type === 'weekly' && (
                        <div className="flex items-center justify-between gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                            {WEEKDAYS.map((day, index) => (
                                <button type="button" key={day} onClick={() => handleDayToggle(index)} className={`px-2 py-1.5 text-xs font-semibold rounded-md w-9 h-9 ${recurrence.daysOfWeek.includes(index) ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200'}`}>{day}</button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>

        <div className="space-y-3 pt-2">
            <h4 className={`${labelBaseClasses} font-heading`}>{t('taskModal.reminders.title')}</h4>
            {reminders.map((reminder, index) => (
                <div key={index} className="flex items-center gap-2 animate-fade-in">
                    <select value={reminder.isBefore ? 'before' : 'after'} onChange={e => updateReminder(index, 'isBefore', e.target.value === 'before')} className={`${inputBaseClasses} !mt-0`}>
                        <option value="before">{t('taskModal.reminders.before')}</option><option value="after">{t('taskModal.reminders.after')}</option>
                    </select>
                    <input type="number" min="1" value={reminder.value} onChange={e => updateReminder(index, 'value', parseInt(e.target.value, 10) || 1)} className={`${inputBaseClasses} !mt-0 w-20`} />
                    <select value={reminder.unit} onChange={e => updateReminder(index, 'unit', e.target.value)} className={`${inputBaseClasses} !mt-0`}>
                        <option value="minutes">{t('taskModal.reminders.unit.minutes')}</option>
                        <option value="hours">{t('taskModal.reminders.unit.hours')}</option>
                        <option value="days">{t('taskModal.reminders.unit.days')}</option>
                    </select>
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeReminder(index)}><Icon name="delete" className="w-5 h-5 text-red-500" /></Button>
                </div>
            ))}
            <Button type="button" variant="secondary" size="sm" onClick={addReminder}><Icon name="plus" className="w-4 h-4 mr-2" />{t('taskModal.reminders.add')}</Button>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200 dark:border-dark-border">
          <Button type="button" variant="secondary" onClick={onClose}>{t('taskModal.button.cancel')}</Button>
          <Button type="submit">{task ? t('taskModal.button.save') : t('taskModal.button.create')}</Button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskDetailModal;
