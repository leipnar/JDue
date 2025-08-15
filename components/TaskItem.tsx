import React from 'react';
import { Task, Priority } from '../types';
import Button from './common/Button';
import Icon from './common/Icon';
import { useTranslation } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const priorityClasses = {
  [Priority.HIGH]: {
    badge: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    dot: 'bg-red-500',
  },
  [Priority.MEDIUM]: {
    badge: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    dot: 'bg-yellow-500',
  },
  [Priority.LOW]: {
    badge: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    dot: 'bg-green-500',
  },
};

const labelColors = [
    'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300',
    'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300',
    'bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300',
    'bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300',
    'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300',
];

const getLabelColor = (label: string) => {
    let hash = 0;
    for (let i = 0; i < label.length; i++) {
        hash = label.charCodeAt(i) + ((hash << 5) - hash);
    }
    return labelColors[Math.abs(hash) % labelColors.length];
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  const { t, language } = useTranslation();
  const { toggleTaskComplete } = useData();
  
  const formattedDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString(language, { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false }) : null;
  const currentPriorityClasses = priorityClasses[task.priority];

  const translatedPriority = {
    [Priority.LOW]: t('taskItem.priority.low'),
    [Priority.MEDIUM]: t('taskItem.priority.medium'),
    [Priority.HIGH]: t('taskItem.priority.high'),
  };
  
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.isComplete;


  return (
    <div className={`bg-light-card dark:bg-dark-card p-4 rounded-xl shadow-md border border-slate-200 dark:border-dark-border transition-all duration-300 animate-slide-in-up flex items-start gap-4 hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-700 ${task.isComplete ? 'opacity-60' : ''}`}>
        <span className={`flex-shrink-0 mt-1.5 w-3 h-3 rounded-full ${currentPriorityClasses.dot}`}></span>

        <div className="flex-grow min-w-0">
           <div className="flex items-center justify-between">
             <p className={`font-semibold text-slate-800 dark:text-slate-100 transition-colors truncate ${task.isComplete ? 'line-through text-slate-500 dark:text-slate-400' : ''}`}>
                {task.title}
             </p>
              <div className="flex items-center space-x-1 ml-4 flex-shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => onEdit(task)} className="w-8 h-8">
                    <Icon name="edit" className="w-5 h-5 text-slate-500" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(task.id)} className="w-8 h-8">
                    <Icon name="delete" className="w-5 h-5 text-red-500" />
                  </Button>
              </div>
           </div>

          {task.description && <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 break-words">{task.description}</p>}
          
          <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mt-3 text-sm">
             <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${currentPriorityClasses.badge}`}>{translatedPriority[task.priority]}</span>
             {formattedDate && (
                <div className={`flex items-center ${isOverdue ? 'text-red-500 font-semibold' : 'text-slate-500 dark:text-slate-400'}`}>
                    <Icon name="calendar" className="w-4 h-4 mr-1.5"/>
                    <span>{formattedDate}</span>
                </div>
            )}
            {task.recurrence && (
                <div className="flex items-center text-slate-500 dark:text-slate-400" title={t('taskItem.repeats', { type: task.recurrence.type })}>
                    <Icon name="recurring" className="w-4 h-4 mr-1.5"/>
                    <span className="hidden sm:inline">{t(`taskModal.recurrence.type.${task.recurrence.type}`)}</span>
                </div>
            )}
          </div>
          {task.labels && task.labels.length > 0 && (
            <div className="flex items-center flex-wrap gap-2 mt-3">
                {task.labels.map(label => (
                    <span key={label} className={`px-2 py-0.5 text-xs font-medium rounded-full ${getLabelColor(label)}`}>
                        {label}
                    </span>
                ))}
            </div>
          )}
        </div>
        
        <div className="flex items-center h-5 pt-1">
          <input
            id={`task-check-${task.id}`}
            type="checkbox"
            checked={task.isComplete}
            onChange={() => toggleTaskComplete(task)}
            className="h-6 w-6 rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-primary-600 focus:ring-primary-500 cursor-pointer transition"
          />
        </div>
    </div>
  );
};

export default TaskItem;
