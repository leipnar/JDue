const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-that-should-be-in-env-vars';

app.use(cors());
app.use(express.json());

// --- DB Helpers ---
const DB_PATH = path.join(__dirname, 'db.json');

const readDb = () => {
    try {
        const data = fs.readFileSync(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Could not read DB, returning empty state.", error);
        return { users: [], projects: [], tasks: [] };
    }
};

const writeDb = (data) => {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
};

// --- Auth Middleware ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user;
        next();
    });
};

const authenticateAdmin = (req, res, next) => {
    const db = readDb();
    const user = db.users.find(u => u.id === req.user.userId);
    if (!user || !user.isAdmin) {
        return res.status(403).json({ message: 'Forbidden: Admin access required.' });
    }
    next();
};

// --- API Routes ---

// AUTH
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const db = readDb();
    const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user || !user.passwordHash) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    if (user.status !== 'active') {
        return res.status(403).json({ message: `This account has been ${user.status}.` });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
});

app.post('/api/auth/forgot-password', (req, res) => {
    // In a real app, this would trigger an email. Here we just log it.
    console.log(`Password reset requested for: ${req.body.email}`);
    res.status(200).json({ message: 'If an account with that email exists, a reset link has been sent.' });
});

// Passkey logic will be added here later if needed. For now, it's a placeholder.
app.post('/api/auth/passkey-login', (req, res) => {
    res.status(501).json({ message: 'Passkey login not fully implemented on backend yet.' });
});

// GET CURRENT USER'S DATA
app.get('/api/users/me', authenticateToken, (req, res) => {
    const db = readDb();
    const user = db.users.find(u => u.id === req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const { passwordHash, salt, ...userWithoutSensitiveData } = user;
    res.json({ user: userWithoutSensitiveData });
});

app.get('/api/data', authenticateToken, (req, res) => {
    const db = readDb();
    const projects = db.projects.filter(p => p.userId === req.user.userId);
    const projectIds = projects.map(p => p.id);
    const tasks = db.tasks.filter(t => projectIds.includes(t.projectId));
    res.json({ projects, tasks });
});

// UPDATE USER
app.put('/api/users/me', authenticateToken, async (req, res) => {
    const db = readDb();
    let user = db.users.find(u => u.id === req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { email, currentPassword, newPassword } = req.body;

    if (email) user.email = email;

    if (newPassword) {
        if (!currentPassword || !await bcrypt.compare(currentPassword, user.passwordHash)) {
            return res.status(400).json({ message: "Current password is not correct." });
        }
        const salt = await bcrypt.genSalt(10);
        user.salt = salt;
        user.passwordHash = await bcrypt.hash(newPassword, salt);
    }
    
    const userIndex = db.users.findIndex(u => u.id === req.user.userId);
    db.users[userIndex] = user;
    writeDb(db);
    
    const { passwordHash, salt, ...userWithoutSensitiveData } = user;
    res.json({ updatedUser: userWithoutSensitiveData });
});

// Passkey registration placeholders
app.post('/api/users/me/passkey-register-challenge', authenticateToken, (req, res) => {
     res.status(501).json({ message: 'Passkey registration not fully implemented on backend yet.' });
});
app.post('/api/users/me/passkey-register-verify', authenticateToken, (req, res) => {
     res.status(501).json({ message: 'Passkey registration not fully implemented on backend yet.' });
});


// PROJECT & TASK CRUD
app.post('/api/projects', authenticateToken, (req, res) => {
    const { name } = req.body;
    const db = readDb();
    const newProject = { id: uuidv4(), name, userId: req.user.userId };
    db.projects.push(newProject);
    writeDb(db);
    res.status(201).json({ newProject });
});

app.post('/api/tasks', authenticateToken, (req, res) => {
    const taskData = req.body;
    const db = readDb();
    const savedTask = {
        id: uuidv4(),
        isComplete: false,
        notificationsSent: {},
        description: '',
        dueDate: null,
        priority: 'Medium',
        recurrence: null,
        reminders: [],
        labels: [],
        ...taskData
    };
    db.tasks.push(savedTask);
    writeDb(db);
    res.status(201).json({ savedTask });
});

app.put('/api/tasks/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const taskData = req.body;
    const db = readDb();
    const taskIndex = db.tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) return res.status(404).json({ message: 'Task not found' });
    
    db.tasks[taskIndex] = { ...db.tasks[taskIndex], ...taskData };
    writeDb(db);
    res.json({ savedTask: db.tasks[taskIndex] });
});

app.delete('/api/tasks/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const db = readDb();
    const tasks = db.tasks.filter(t => t.id !== id);
    if (tasks.length === db.tasks.length) return res.status(404).json({ message: 'Task not found' });
    db.tasks = tasks;
    writeDb(db);
    res.sendStatus(204);
});

app.post('/api/tasks/:id/toggle', authenticateToken, (req, res) => {
    const { id } = req.params;
    const db = readDb();
    const taskIndex = db.tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) return res.status(404).json({ message: 'Task not found' });

    let task = db.tasks[taskIndex];
    if (task.recurrence && !task.isComplete && task.dueDate) {
        // Dummy implementation of calculateNextDueDate
        const nextDate = new Date(task.dueDate);
        nextDate.setDate(nextDate.getDate() + 1); // Simple daily recurrence for example
        task.dueDate = nextDate.toISOString();
    } else {
        task.isComplete = !task.isComplete;
    }
    db.tasks[taskIndex] = task;
    writeDb(db);
    res.json({ updatedTask: task });
});

app.post('/api/tasks/:taskId/notifications', authenticateToken, (req, res) => {
    const { taskId } = req.params;
    const { notificationKey } = req.body;
    const db = readDb();
    const taskIndex = db.tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return res.status(404).json({ message: 'Task not found' });

    let task = db.tasks[taskIndex];
    if (!task.notificationsSent) {
        task.notificationsSent = {};
    }
    task.notificationsSent[notificationKey] = Date.now();
    db.tasks[taskIndex] = task;
    writeDb(db);
    res.json({ updatedTask: task });
});

// ADMIN ROUTES
app.get('/api/admin/data', authenticateToken, authenticateAdmin, (req, res) => {
    const db = readDb();
    const usersWithoutPasswords = db.users.map(u => {
        const { passwordHash, salt, ...rest } = u;
        return rest;
    });
    res.json({ users: usersWithoutPasswords, projects: db.projects, tasks: db.tasks });
});

app.get('/api/admin/stats', authenticateToken, authenticateAdmin, (req, res) => {
    const db = readDb();
    res.json({
        userCount: db.users.length,
        projectCount: db.projects.length,
        taskCount: db.tasks.length,
    });
});

app.post('/api/admin/users', authenticateToken, authenticateAdmin, async (req, res) => {
    const { username, password } = req.body;
    const db = readDb();
    
    if (db.users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
        return res.status(400).json({ message: "Username already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = {
        id: uuidv4(),
        username,
        email: `${username.replace(/\s/g, '_')}@example.local`,
        passwordHash,
        salt,
        isAdmin: false,
        passkeys: [],
        status: 'active',
    };
    db.users.push(newUser);
    
    // Add default project for the new user
    const newProject = { id: uuidv4(), name: 'My First Project', userId: newUser.id };
    db.projects.push(newProject);

    writeDb(db);
    const { passwordHash: ph, salt: s, ...newUserSafe } = newUser;
    res.status(201).json({ newUser: newUserSafe });
});

app.put('/api/admin/users/:id/status', authenticateToken, authenticateAdmin, (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const db = readDb();
    const userIndex = db.users.findIndex(u => u.id === id);
    if (userIndex === -1) return res.status(404).json({ message: 'User not found' });
    db.users[userIndex].status = status;
    writeDb(db);
    res.sendStatus(204);
});

app.delete('/api/admin/users/:id', authenticateToken, authenticateAdmin, (req, res) => {
    const { id } = req.params;
    if (id === req.user.userId) return res.status(400).json({ message: 'Cannot delete self.' });

    let db = readDb();
    const projectsToDelete = db.projects.filter(p => p.userId === id).map(p => p.id);
    
    db.users = db.users.filter(u => u.id !== id);
    db.projects = db.projects.filter(p => p.userId !== id);
    db.tasks = db.tasks.filter(t => !projectsToDelete.includes(t.projectId));

    writeDb(db);
    res.sendStatus(204);
});


// --- Serve Static Frontend ---
app.use(express.static(path.join(__dirname, '..')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
