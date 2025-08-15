
import React, { useState, useMemo } from 'react';
import { Project, Task, Priority } from '../types';
import TaskItem from './TaskItem';
import TaskDetailModal from './TaskDetailModal';
import Button from './common/Button';
import Icon from './common/Icon';
import { useTranslation } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

interface TaskListProps {
  project: Project | null; // Can be null for smart views
  title: string;
  tasks: Task[];
}

type FilterStatus = 'all' | 'completed' | 'incomplete';
type SortOrder = 'dueDate' | 'priority';

const TaskList: React.FC<TaskListProps> = ({ project, title, tasks }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [sortOrder, setSortOrder] = useState<SortOrder>('priority');
  const { t } = useTranslation();
  const { deleteTask } = useData();

  const handleOpenModal = (task: Task | null = null) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const filteredAndSortedTasks = useMemo(() => {
    let result = tasks
      .filter(task => {
        const term = searchTerm.toLowerCase();
        if (!term) return true;
        return (
            task.title.toLowerCase().includes(term) ||
            task.description.toLowerCase().includes(term) ||
            task.labels.some(label => label.toLowerCase().includes(term))
        );
      })
      .filter(task => {
        if (filterStatus === 'completed') return task.isComplete;
        if (filterStatus === 'incomplete') return !task.isComplete;
        return true;
      });

    const priorityOrder = { [Priority.HIGH]: 3, [Priority.MEDIUM]: 2, [Priority.LOW]: 1 };

    result.sort((a, b) => {
        if (sortOrder === 'priority') {
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        if (sortOrder === 'dueDate') {
            if (a.dueDate === b.dueDate) return 0;
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }
        return 0;
    });

    return result;
  }, [tasks, searchTerm, filterStatus, sortOrder]);
  
  const FilterPill: React.FC<{value: FilterStatus, label: string}> = ({ value, label }) => (
      <button onClick={() => setFilterStatus(value)} className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${filterStatus === value ? 'bg-primary-600 text-white shadow' : 'bg-light-card dark:bg-dark-card hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
          {label}
      </button>
  );
  
  const SortPill: React.FC<{value: SortOrder, label: string}> = ({ value, label }) => (
      <button onClick={() => setSortOrder(value)} className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${sortOrder === value ? 'bg-secondary-600 text-white shadow' : 'bg-light-card dark:bg-dark-card hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
          {label}
      </button>
  );

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 truncate">{title}</h1>
        {project && (
            <Button onClick={() => handleOpenModal()} size="lg">
                <Icon name="plus" className="w-5 h-5 mr-2"/>
                {t('taskList.addTask')}
            </Button>
        )}
      </div>

       <div className="bg-light-card/80 dark:bg-dark-card/80 backdrop-blur-sm p-4 rounded-xl shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Icon name="search" className="w-5 h-5 text-slate-400 dark:text-slate-500 absolute top-1/2 left-3 transform -translate-y-1/2"/>
          <input
            type="text"
            placeholder={t('taskList.searchPlaceholder')}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border bg-light-card dark:bg-slate-800 border-slate-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-sans"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-end">
          <div className="flex items-center gap-2 p-1 bg-slate-200 dark:bg-slate-900 rounded-full">
              <FilterPill value="all" label={t('taskList.filter.all')} />
              <FilterPill value="incomplete" label={t('taskList.filter.incomplete')} />
              <FilterPill value="completed" label={t('taskList.filter.completed')} />
          </div>
           <div className="flex items-center gap-2 p-1 bg-slate-200 dark:bg-slate-900 rounded-full">
              <SortPill value="priority" label={t('taskList.sort.priority')} />
              <SortPill value="dueDate" label={t('taskList.sort.dueDate')} />
          </div>
        </div>
      </div>


      <div className="space-y-3">
        {filteredAndSortedTasks.length > 0 ? (
          filteredAndSortedTasks.map(task => (
            <TaskItem 
                key={task.id} 
                task={task} 
                onEdit={handleOpenModal} 
                onDelete={deleteTask}
            />
          ))
        ) : (
          <div className="text-center py-16 px-6 bg-light-card dark:bg-dark-card rounded-lg shadow-sm">
             <Icon name="empty" className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600"/>
            <h3 className="mt-4 text-xl font-semibold text-slate-600 dark:text-slate-300">{t('taskList.empty.title')}</h3>
            <p className="mt-1 text-slate-500 dark:text-slate-400">
                {searchTerm ? t('taskList.empty.noMatch') : t('taskList.empty.getStarted')}
            </p>
          </div>
        )}
      </div>

      {isModalOpen && project && (
        <TaskDetailModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          task={editingTask}
          projectId={project.id}
        />
      )}
    </div>
  );
};

export default TaskList;
