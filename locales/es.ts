
const translations = {
  appName: "JDue",
  loading: "Cargando...",
  language: {
    english: "English",
    german: "Deutsch",
    japanese: "日本語",
    spanish: "Español",
    change: "Cambiar idioma",
  },
  login: {
    signInTitle: "Inicia sesión en tu cuenta",
    or: "O",
    usernamePlaceholder: "Nombre de usuario",
    emailPlaceholder: "Correo Electrónico",
    passwordPlaceholder: "Contraseña",
    forgotPassword: "¿Olvidaste tu contraseña?",
    signInButton: "Iniciar sesión",
    signInWithPasskey: "Iniciar sesión con una Passkey",
    passkeyError: "No se pudo iniciar sesión con la passkey. Inténtalo de nuevo o usa tu contraseña.",
    passkeyUserNotFound: "Error de autenticación con Passkey. No se encontró un usuario para esta passkey.",
    adminAddsUsers: "Por favor, inicie sesión para continuar. Si no tiene una cuenta, por favor contacte al administrador.",
    error: {
      invalidCredentials: "Correo electrónico o contraseña no válidos.",
      usernameLength: "El nombre de usuario debe tener al menos 3 caracteres.",
      passwordLength: "La contraseña debe tener al menos 6 caracteres.",
      invalidEmail: "Por favor, introduce una dirección de correo electrónico válida.",
      accountStatus: "Esta cuenta ha sido {status}. Por favor, contacta a un administrador.",
    },
    brand: {
      title: "Aporta claridad a tu trabajo.",
      description: "Gestiona proyectos, organiza tareas y cumple tus plazos.",
    }
  },

  forgotPasswordModal: {
    title: "Restablecer Contraseña",
    description: "Introduce tu dirección de correo electrónico y te enviaremos un enlace para restablecer tu contraseña.",
    emailPlaceholder: "tu.email@ejemplo.com",
    button: "Enviar Enlace de Restablecimiento",
    success: "Si existe una cuenta para {email}, se ha enviado un enlace de restablecimiento.",
    close: "Cerrar",
  },

  header: {
    dashboard: "Tablero",
    notifications: {
      enable: "Haz clic para habilitar las notificaciones",
      enabled: "Notificaciones habilitadas",
    },
    theme: {
      toggle: "Cambiar tema",
    },
    logout: "Cerrar sesión",
  },
  sidebar: {
    today: "Hoy",
    upcoming: "Próximamente",
    projects: "Proyectos",
    newProjectPlaceholder: "Nombre del nuevo proyecto...",
    addProjectButton: "Añadir Proyecto",
  },
  taskList: {
    addTask: "Añadir Tarea",
    searchPlaceholder: "Buscar tareas, etiquetas...",
    filter: {
      all: "Todos",
      completed: "Completadas",
      incomplete: "Incompletas",
    },
    sort: {
      priority: "Prioridad",
      dueDate: "Fecha Límite",
    },
    empty: {
      title: "No hay tareas aquí",
      noMatch: "No hay tareas que coincidan con tu búsqueda.",
      getStarted: "¡Añade una tarea a un proyecto para empezar!",
    },
    noProject: {
      title: "Ningún proyecto seleccionado",
      description: "Crea o selecciona un proyecto en la barra lateral para comenzar.",
    }
  },
  taskItem: {
    priority: {
      low: "Baja",
      medium: "Media",
      high: "Alta",
    },
    repeats: "Se repite {type}",
  },
  taskModal: {
    title: {
      edit: "Editar Tarea",
      add: "Añadir Nueva Tarea",
    },
    field: {
      title: "Título",
      description: "Descripción",
      dueDate: "Fecha Límite",
      dueTime: "Hora Límite",
      priority: "Prioridad",
      labels: "Etiquetas",
      labelsPlaceholder: "ej: trabajo, urgente, marketing",
    },
    recurrence: {
      title: "Recurrencia",
      checkbox: "Tarea Recurrente",
      type: {
        daily: "Diariamente",
        weekly: "Semanalmente",
        monthly: "Mensualmente",
        yearly: "Anualmente",
      },
      yearly: {
        everyYear: "Cada Año",
        every2Years: "Cada 2 Años",
        every3Years: "Cada 3 Años",
        every5Years: "Cada 5 Años",
      }
    },
    reminders: {
      title: "Recordatorios",
      before: "Antes",
      after: "Después",
      unit: {
        minutes: "Minutos",
        hours: "Horas",
        days: "Días",
      },
      add: "Añadir Recordatorio",
    },
    button: {
      cancel: "Cancelar",
      close: "Cerrar",
      save: "Guardar Cambios",
      create: "Crear Tarea",
    }
  },
  weekdays: {
    sun: "Dom",
    mon: "Lun",
    tue: "Mar",
    wed: "Mié",
    thu: "Jue",
    fri: "Vie",
    sat: "Sáb",
  },
  profileModal: {
    title: "Ajustes de Perfil para {username}",
    email: {
      title: "Correo Electrónico",
    },
    password: {
      title: "Cambiar Contraseña"
    },
    field: {
      email: "Correo",
      currentPassword: "Contraseña Actual",
      newPassword: "Nueva Contraseña",
      confirmNewPassword: "Confirmar Nueva Contraseña",
    },
    error: {
      wrongPassword: "La contraseña actual no es correcta.",
      passwordLength: "La nueva contraseña debe tener al menos 6 caracteres.",
      passwordMismatch: "Las nuevas contraseñas no coinciden.",
      noPasswordSet: "No se puede cambiar la contraseña, es posible que te hayas registrado con una cuenta social.",
    },
    success: {
      password: "¡Contraseña actualizada con éxito!",
      email: "¡Correo electrónico actualizado con éxito!",
    },
    button: {
      updatePassword: "Actualizar Contraseña",
      updateEmail: "Actualizar Correo",
    },
    passkey: {
      title: "Passkeys (Inicio de sesión sin contraseña)",
      none: "No tienes passkeys registradas para este dispositivo.",
      registered: "Passkey #{index}",
      registerButton: "Registrar una nueva Passkey",
      registering: "Sigue las instrucciones de tu navegador para crear una passkey...",
      success: "¡Passkey registrada con éxito!",
      error: "Error al registrar la passkey: {error}",
    }
  },
  admin: {
    title: "JDue Admin",
    userManagement: "Gestión de Usuarios",
    role: {
      admin: "Administrador",
      user: "Usuario",
    },
    deleteUser: "Eliminar",
    banUser: "Bloquear",
    deactivateUser: "Desactivar",
    activateUser: "Activar",
    currentUser: "(Tú)",
    confirmDelete: "¿Estás seguro de que quieres eliminar este usuario? Esta acción es permanente.",
    addUser: "Añadir Usuario",
    searchUsers: "Buscar usuarios...",
    status: "Estado",
    statusType: {
      active: "Activo",
      banned: "Bloqueado",
      deactivated: "Desactivado"
    },
    actions: "Acciones",
    systemStats: "Estadísticas del Sistema",
    totalUsers: "Usuarios Totales",
    totalProjects: "Proyectos Totales",
    totalTasks: "Tareas Totales",
    addUserModalTitle: "Crear un Nuevo Usuario",
    tempPassword: "Contraseña Temporal",
    tempPasswordNotice: "Se le pedirá al usuario que la cambie en su primer inicio de sesión.",
    profileSettings: "Ajustes de Perfil"
  }
};

export default translations;