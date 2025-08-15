
const translations = {
  appName: "JDue",
  loading: "Wird geladen...",
  language: {
    english: "English",
    german: "Deutsch",
    japanese: "日本語",
    spanish: "Español",
    change: "Sprache ändern",
  },
  login: {
    signInTitle: "Melden Sie sich bei Ihrem Konto an",
    or: "Oder",
    usernamePlaceholder: "Benutzername",
    emailPlaceholder: "E-Mail-Adresse",
    passwordPlaceholder: "Passwort",
    forgotPassword: "Passwort vergessen?",
    signInButton: "Anmelden",
    signInWithPasskey: "Mit einem Passkey anmelden",
    passkeyError: "Anmeldung mit Passkey fehlgeschlagen. Bitte erneut versuchen oder Passwort verwenden.",
    passkeyUserNotFound: "Passkey-Authentifizierung fehlgeschlagen. Benutzer für diesen Passkey nicht gefunden.",
    adminAddsUsers: "Bitte melden Sie sich an, um fortzufahren. Wenn Sie kein Konto haben, kontaktieren Sie bitte den Administrator.",
    error: {
      invalidCredentials: "Ungültige E-Mail oder ungültiges Passwort.",
      usernameLength: "Benutzername muss mindestens 3 Zeichen lang sein.",
      passwordLength: "Passwort muss mindestens 6 Zeichen lang sein.",
      invalidEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
      accountStatus: "Dieses Konto wurde {status}. Bitte kontaktieren Sie einen Administrator.",
    },
    brand: {
      title: "Bringen Sie Klarheit in Ihre Arbeit.",
      description: "Verwalten Sie Projekte, organisieren Sie Aufgaben und halten Sie Ihre Fristen ein.",
    }
  },

  forgotPasswordModal: {
    title: "Passwort zurücksetzen",
    description: "Geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen einen Link zum Zurücksetzen Ihres Passworts.",
    emailPlaceholder: "ihre.email@beispiel.com",
    button: "Link zum Zurücksetzen senden",
    success: "Wenn ein Konto für {email} existiert, wurde ein Link zum Zurücksetzen gesendet.",
    close: "Schließen",
  },

  header: {
    dashboard: "Dashboard",
    notifications: {
      enable: "Klicken, um Benachrichtigungen zu aktivieren",
      enabled: "Benachrichtigungen aktiviert",
    },
    theme: {
      toggle: "Theme umschalten",
    },
    logout: "Abmelden",
  },
  sidebar: {
    today: "Heute",
    upcoming: "Demnächst",
    projects: "Projekte",
    newProjectPlaceholder: "Neuer Projektname...",
    addProjectButton: "Projekt hinzufügen",
  },
  taskList: {
    addTask: "Aufgabe hinzufügen",
    searchPlaceholder: "Aufgaben, Etiketten suchen...",
    filter: {
      all: "Alle",
      completed: "Fertig",
      incomplete: "Offen",
    },
    sort: {
      priority: "Priorität",
      dueDate: "Datum",
    },
    empty: {
      title: "Keine Aufgaben hier",
      noMatch: "Keine Aufgaben entsprechen Ihrer Suche.",
      getStarted: "Fügen Sie eine Aufgabe zu einem Projekt hinzu, um loszulegen!",
    },
    noProject: {
      title: "Kein Projekt ausgewählt",
      description: "Erstellen oder wählen Sie ein Projekt aus der Seitenleiste, um zu beginnen.",
    }
  },
  taskItem: {
    priority: {
      low: "Niedrig",
      medium: "Mittel",
      high: "Hoch",
    },
    repeats: "Wiederholt sich {type}",
  },
  taskModal: {
    title: {
      edit: "Aufgabe bearbeiten",
      add: "Neue Aufgabe hinzufügen",
    },
    field: {
      title: "Titel",
      description: "Beschreibung",
      dueDate: "Fälligkeitsdatum",
      dueTime: "Fällige Uhrzeit",
      priority: "Priorität",
      labels: "Etiketten",
      labelsPlaceholder: "z.B. Arbeit, dringend, Marketing",
    },
    recurrence: {
      title: "Wiederholung",
      checkbox: "Wiederkehrende Aufgabe",
      type: {
        daily: "Täglich",
        weekly: "Wöchentlich",
        monthly: "Monatlich",
        yearly: "Jährlich",
      },
      yearly: {
        everyYear: "Jedes Jahr",
        every2Years: "Alle 2 Jahre",
        every3Years: "Alle 3 Jahre",
        every5Years: "Alle 5 Jahre",
      }
    },
    reminders: {
      title: "Erinnerungen",
      before: "Vorher",
      after: "Nachher",
      unit: {
        minutes: "Minuten",
        hours: "Stunden",
        days: "Tage",
      },
      add: "Erinnerung hinzufügen",
    },
    button: {
      cancel: "Abbrechen",
      close: "Schließen",
      save: "Änderungen speichern",
      create: "Aufgabe erstellen",
    }
  },
  weekdays: {
    sun: "So",
    mon: "Mo",
    tue: "Di",
    wed: "Mi",
    thu: "Do",
    fri: "Fr",
    sat: "Sa",
  },
  profileModal: {
    title: "Profileinstellungen für {username}",
    email: {
      title: "E-Mail-Adresse",
    },
    password: {
      title: "Passwort ändern"
    },
    field: {
      email: "E-Mail",
      currentPassword: "Aktuelles Passwort",
      newPassword: "Neues Passwort",
      confirmNewPassword: "Neues Passwort bestätigen",
    },
    error: {
      wrongPassword: "Aktuelles Passwort ist nicht korrekt.",
      passwordLength: "Neues Passwort muss mindestens 6 Zeichen lang sein.",
      passwordMismatch: "Neue Passwörter stimmen nicht überein.",
      noPasswordSet: "Passwort kann nicht geändert werden, möglicherweise haben Sie sich mit einem sozialen Konto angemeldet.",
    },
    success: {
        password: "Passwort erfolgreich aktualisiert!",
        email: "E-Mail erfolgreich aktualisiert!",
    },
    button: {
      updatePassword: "Passwort aktualisieren",
      updateEmail: "E-Mail aktualisieren",
    },
    passkey: {
      title: "Passkeys (Passwortlose Anmeldung)",
      none: "Sie haben keine Passkeys für dieses Gerät registriert.",
      registered: "Passkey #{index}",
      registerButton: "Neuen Passkey registrieren",
      registering: "Folgen Sie den Anweisungen Ihres Browsers, um einen Passkey zu erstellen...",
      success: "Passkey erfolgreich registriert!",
      error: "Registrierung des Passkeys fehlgeschlagen: {error}",
    }
  },
  admin: {
    title: "JDue Admin",
    userManagement: "Benutzerverwaltung",
    role: {
      admin: "Administrator",
      user: "Benutzer",
    },
    deleteUser: "Löschen",
    banUser: "Sperren",
    deactivateUser: "Deaktivieren",
    activateUser: "Aktivieren",
    currentUser: "(Sie)",
    confirmDelete: "Sind Sie sicher, dass Sie diesen Benutzer löschen möchten? Diese Aktion ist dauerhaft.",
    addUser: "Benutzer hinzufügen",
    searchUsers: "Benutzer suchen...",
    status: "Status",
    statusType: {
      active: "Aktiv",
      banned: "Gesperrt",
      deactivated: "Deaktiviert"
    },
    actions: "Aktionen",
    systemStats: "Systemstatistiken",
    totalUsers: "Benutzer gesamt",
    totalProjects: "Projekte gesamt",
    totalTasks: "Aufgaben gesamt",
    addUserModalTitle: "Neuen Benutzer erstellen",
    tempPassword: "Temporäres Passwort",
    tempPasswordNotice: "Der Benutzer wird aufgefordert, dieses bei der ersten Anmeldung zu ändern.",
    profileSettings: "Profileinstellungen"
  }
};

export default translations;