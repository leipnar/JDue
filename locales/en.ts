
const translations = {
  appName: "JDue",
  loading: "Loading...",
  language: {
    english: "English",
    german: "Deutsch",
    japanese: "日本語",
    spanish: "Español",
    change: "Change language",
  },

  login: {
    signInTitle: "Sign in to your account",
    or: "Or",
    usernamePlaceholder: "Username",
    emailPlaceholder: "Email Address",
    passwordPlaceholder: "Password",
    forgotPassword: "Forgot password?",
    signInButton: "Sign In",
    signInWithPasskey: "Sign in with a Passkey",
    passkeyError: "Could not sign in with passkey. Please try again or use your password.",
    passkeyUserNotFound: "Passkey authentication failed. User not found for this passkey.",
    adminAddsUsers: "Please log in to continue. If you don't have an account, please contact the administrator.",
    error: {
      invalidCredentials: "Invalid email or password.",
      usernameLength: "Username must be at least 3 characters long.",
      passwordLength: "Password must be at least 6 characters long.",
      invalidEmail: "Please enter a valid email address.",
      accountStatus: "This account has been {status}. Please contact an administrator.",
    },
    brand: {
      title: "Bring clarity to your work.",
      description: "Manage projects, organize tasks, and hit your deadlines.",
    }
  },

  forgotPasswordModal: {
    title: "Reset Password",
    description: "Enter your email address and we'll send you a link to reset your password.",
    emailPlaceholder: "your.email@example.com",
    button: "Send Reset Link",
    success: "If an account exists for {email}, a reset link has been sent.",
    close: "Close",
  },

  header: {
    dashboard: "Dashboard",
    notifications: {
      enable: "Click to enable notifications",
      enabled: "Notifications enabled",
    },
    theme: {
      toggle: "Toggle theme",
    },
    logout: "Logout",
  },

  sidebar: {
    today: "Today",
    upcoming: "Upcoming",
    projects: "Projects",
    newProjectPlaceholder: "New project name...",
    addProjectButton: "Add Project",
  },

  taskList: {
    addTask: "Add Task",
    searchPlaceholder: "Search tasks, labels...",
    filter: {
      all: "All",
      completed: "Completed",
      incomplete: "Incomplete",
    },
    sort: {
      priority: "Priority",
      dueDate: "Due Date",
    },
    empty: {
      title: "No tasks here",
      noMatch: "No tasks match your search.",
      getStarted: "Add a task to a project to get started!",
    },
    noProject: {
      title: "No project selected",
      description: "Create or select a project from the sidebar to get started.",
    }
  },

  taskItem: {
    priority: {
      low: "Low",
      medium: "Medium",
      high: "High",
    },
    repeats: "Repeats {type}",
  },

  taskModal: {
    title: {
      edit: "Edit Task",
      add: "Add New Task",
    },
    field: {
      title: "Title",
      description: "Description",
      dueDate: "Due Date",
      dueTime: "Due Time",
      priority: "Priority",
      labels: "Labels",
      labelsPlaceholder: "e.g. work, urgent, marketing",
    },
    recurrence: {
      title: "Recurrence",
      checkbox: "Recurring Task",
      type: {
        daily: "Daily",
        weekly: "Weekly",
        monthly: "Monthly",
        yearly: "Yearly",
      },
      yearly: {
        everyYear: "Every Year",
        every2Years: "Every 2 Years",
        every3Years: "Every 3 Years",
        every5Years: "Every 5 Years",
      }
    },
    reminders: {
      title: "Reminders",
      before: "Before",
      after: "After",
      unit: {
        minutes: "Minutes",
        hours: "Hours",
        days: "Days",
      },
      add: "Add Reminder",
    },
    button: {
      cancel: "Cancel",
      close: "Close",
      save: "Save Changes",
      create: "Create Task",
    }
  },
  
  weekdays: {
    sun: "Sun",
    mon: "Mon",
    tue: "Tue",
    wed: "Wed",
    thu: "Thu",
    fri: "Fri",
    sat: "Sat",
  },

  profileModal: {
    title: "Profile Settings for {username}",
    email: {
      title: "Email Address"
    },
    password: {
      title: "Change Password"
    },
    field: {
      email: "Email",
      currentPassword: "Current Password",
      newPassword: "New Password",
      confirmNewPassword: "Confirm New Password",
    },
    error: {
      wrongPassword: "Current password is not correct.",
      passwordLength: "New password must be at least 6 characters long.",
      passwordMismatch: "New passwords do not match.",
      noPasswordSet: "Cannot change password, you may have signed up with a social account.",
    },
    success: {
        password: "Password updated successfully!",
        email: "Email updated successfully!",
    },
    button: {
      updatePassword: "Update Password",
      updateEmail: "Update Email"
    },
    passkey: {
      title: "Passkeys (Passwordless Login)",
      none: "You have no passkeys registered for this device.",
      registered: "Passkey #{index}",
      registerButton: "Register a new Passkey",
      registering: "Follow your browser's instructions to create a passkey...",
      success: "Passkey registered successfully!",
      error: "Failed to register passkey: {error}",
    }
  },

  admin: {
    title: "JDue Admin",
    userManagement: "User Management",
    role: {
      admin: "Administrator",
      user: "User",
    },
    deleteUser: "Delete",
    banUser: "Ban",
    deactivateUser: "Deactivate",
    activateUser: "Activate",
    currentUser: "(You)",
    confirmDelete: "Are you sure you want to delete this user? This action is permanent.",
    addUser: "Add User",
    searchUsers: "Search users...",
    status: "Status",
    statusType: {
      active: "Active",
      banned: "Banned",
      deactivated: "Deactivated"
    },
    actions: "Actions",
    systemStats: "System Stats",
    totalUsers: "Total Users",
    totalProjects: "Total Projects",
    totalTasks: "Total Tasks",
    addUserModalTitle: "Create a New User",
    tempPassword: "Temporary Password",
    tempPasswordNotice: "The user will be prompted to change this on their first login.",
    profileSettings: "Profile Settings"
  }
};

export default translations;