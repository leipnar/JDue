import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User, Project, Task } from '../types';
import { calculateNextDueDate } from '../utils/time';
import apiFetch from '../services/api';

// --- Token Management ---
const TOKEN_KEY = 'todo_auth_token';

const getAuthToken = (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
}
const setAuthToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
const removeAuthToken = () => localStorage.removeItem(TOKEN_KEY);

// --- Context Definition ---
interface DataContextType {
    // State
    currentUser: User | null;
    projects: Project[];
    tasks: Task[];
    users: User[]; // For admin view
    isLoading: boolean;
    
    // Auth
    login: (email: string, password: string) => Promise<User>;
    passkeyLogin: (credential: PublicKeyCredential) => Promise<User>;
    forgotPassword: (email: string) => Promise<void>;
    logout: () => Promise<void>;
    
    // User Management
    updateUser: (updatedUserData: Partial<User> & { currentPassword?: string; newPassword?: string }) => Promise<User>;
    addUserByAdmin: (username: string, password: string) => Promise<User>;
    deleteUser: (userId: string) => Promise<void>;
    updateUserStatus: (userId: string, status: User['status']) => Promise<void>;
    registerPasskey: () => Promise<void>;

    // Project Management
    addProject: (name: string) => Promise<Project>;

    // Task Management
    saveTask: (taskData: Partial<Task> & { projectId: string; title: string; }) => Promise<Task>;
    deleteTask: (taskId: string) => Promise<void>;
    toggleTaskComplete: (task: Task) => Promise<void>;
    markNotificationSent: (taskId: string, notificationKey: string) => Promise<void>;

    // System Stats
    getSystemStats: () => Promise<{ userCount: number; projectCount: number; taskCount: number }>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// --- Provider Component ---
export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [users, setUsers] = useState<User[]>([]); // For admin
    const [isLoading, setIsLoading] = useState(true);

    const loadInitialData = useCallback(async () => {
        const token = getAuthToken();
        if (token) {
            try {
                // Fetch user and their data concurrently
                const [userData, appData] = await Promise.all([
                    apiFetch('/users/me'),
                    apiFetch('/data')
                ]);

                setCurrentUser(userData.user);
                setProjects(appData.projects);
                setTasks(appData.tasks);
                
                // If admin, fetch admin data
                if (userData.user.isAdmin) {
                    const adminData = await apiFetch('/admin/data');
                    setUsers(adminData.users);
                }

            } catch (error) {
                console.error("Session expired or invalid, logging out.", error);
                removeAuthToken();
                setCurrentUser(null);
            }
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        loadInitialData();
    }, [loadInitialData]);
    
    const login = useCallback(async (email: string, password: string): Promise<User> => {
        const { token } = await apiFetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        setAuthToken(token);
        setIsLoading(true);
        await loadInitialData();
        // The currentUser will be set by loadInitialData, but we can return it early from the token if needed
        const userPayload = JSON.parse(atob(token.split('.')[1]));
        return userPayload;
    }, [loadInitialData]);

    const passkeyLogin = useCallback(async (credential: PublicKeyCredential) => {
        const { token } = await apiFetch('/auth/passkey-login', {
            method: 'POST',
            body: JSON.stringify({ credential }),
        });
        setAuthToken(token);
        setIsLoading(true);
        await loadInitialData();
        const userPayload = JSON.parse(atob(token.split('.')[1]));
        return userPayload;
    }, [loadInitialData]);
    
    const forgotPassword = useCallback(async (email: string): Promise<void> => {
        await apiFetch('/auth/forgot-password', {
            method: 'POST',
            body: JSON.stringify({ email }),
        });
    }, []);

    const logout = useCallback(async (): Promise<void> => {
        removeAuthToken();
        setCurrentUser(null);
        setProjects([]);
        setTasks([]);
        setUsers([]);
    }, []);

    const updateUser = useCallback(async (updatedUserData: Partial<User> & { currentPassword?: string; newPassword?: string; }): Promise<User> => {
        const { updatedUser } = await apiFetch('/users/me', {
            method: 'PUT',
            body: JSON.stringify(updatedUserData),
        });
        setCurrentUser(updatedUser);
        return updatedUser;
    }, []);

    const registerPasskey = useCallback(async () => {
        const { challenge } = await apiFetch('/users/me/passkey-register-challenge', { method: 'POST' });
        
        // This part needs the utils to be available
        const { stringToBuffer } = await import('../utils/crypto');

        const credential = await navigator.credentials.create({
            publicKey: {
                ...challenge,
                user: {
                    ...challenge.user,
                    id: stringToBuffer(challenge.user.id),
                },
                challenge: stringToBuffer(challenge.challenge),
            }
        }) as PublicKeyCredential;

        const { updatedUser } = await apiFetch('/users/me/passkey-register-verify', {
            method: 'POST',
            body: JSON.stringify({ credential }),
        });
        
        setCurrentUser(updatedUser);
    }, []);

    const addUserByAdmin = useCallback(async (username: string, password: string): Promise<User> => {
        const { newUser } = await apiFetch('/admin/users', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });
        setUsers(prev => [...prev, newUser]);
        return newUser;
    }, []);

    const deleteUser = useCallback(async (userId: string): Promise<void> => {
        await apiFetch(`/admin/users/${userId}`, { method: 'DELETE' });
        setUsers(prev => prev.filter(u => u.id !== userId));
    }, []);

    const updateUserStatus = useCallback(async (userId: string, status: User['status']): Promise<void> => {
        await apiFetch(`/admin/users/${userId}/status`, {
            method: 'PUT',
            body: JSON.stringify({ status }),
        });
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, status } : u));
    }, []);
    
    const addProject = useCallback(async (name: string): Promise<Project> => {
        const { newProject } = await apiFetch('/projects', {
            method: 'POST',
            body: JSON.stringify({ name }),
        });
        setProjects(prev => [...prev, newProject]);
        return newProject;
    }, []);
    
    const saveTask = useCallback(async (taskData: Partial<Task> & { projectId: string; title: string; }): Promise<Task> => {
        const endpoint = taskData.id ? `/tasks/${taskData.id}` : '/tasks';
        const method = taskData.id ? 'PUT' : 'POST';

        const { savedTask } = await apiFetch(endpoint, {
            method,
            body: JSON.stringify(taskData),
        });
        
        if (taskData.id) {
            setTasks(prev => prev.map(t => t.id === savedTask.id ? savedTask : t));
        } else {
            setTasks(prev => [...prev, savedTask]);
        }
        return savedTask;
    }, []);
    
    const deleteTask = useCallback(async (taskId: string): Promise<void> => {
        await apiFetch(`/tasks/${taskId}`, { method: 'DELETE' });
        setTasks(prev => prev.filter(t => t.id !== taskId));
    }, []);

    const toggleTaskComplete = useCallback(async (task: Task): Promise<void> => {
        const { updatedTask } = await apiFetch(`/tasks/${task.id}/toggle`, { method: 'POST' });
        setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
    }, []);
    
    const markNotificationSent = useCallback(async (taskId: string, notificationKey: string) => {
        try {
            const { updatedTask } = await apiFetch(`/tasks/${taskId}/notifications`, {
                method: 'POST',
                body: JSON.stringify({ notificationKey }),
            });
            setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t));
        } catch (error) {
            console.error("Failed to mark notification as sent:", error);
        }
    }, []);

    const getSystemStats = useCallback(async () => {
        return await apiFetch('/admin/stats');
    }, []);

    const value = {
        currentUser, projects, tasks, users, isLoading,
        login, passkeyLogin, forgotPassword, logout,
        updateUser, registerPasskey,
        addUserByAdmin, deleteUser, updateUserStatus,
        addProject,
        saveTask, deleteTask, toggleTaskComplete, markNotificationSent,
        getSystemStats,
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// --- Hook ---
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};