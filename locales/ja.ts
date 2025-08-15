
const translations = {
  appName: "JDue",
  loading: "読み込み中...",
  language: {
    english: "English",
    german: "Deutsch",
    japanese: "日本語",
    spanish: "Español",
    change: "言語を変更",
  },
  login: {
    signInTitle: "アカウントにサインイン",
    or: "または",
    usernamePlaceholder: "ユーザー名",
    emailPlaceholder: "メールアドレス",
    passwordPlaceholder: "パスワード",
    forgotPassword: "パスワードをお忘れですか？",
    signInButton: "サインイン",
    signInWithPasskey: "パスキーでサインイン",
    passkeyError: "パスキーでサインインできませんでした。もう一度試すか、パスワードを使用してください。",
    passkeyUserNotFound: "パスキー認証に失敗しました。このパスキーのユーザーが見つかりません。",
    adminAddsUsers: "続行するにはログインしてください。アカウントをお持ちでない場合は、管理者に連絡してください。",
    error: {
      invalidCredentials: "メールアドレスまたはパスワードが無効です。",
      usernameLength: "ユーザー名は3文字以上である必要があります。",
      passwordLength: "パスワードは6文字以上である必要があります。",
      invalidEmail: "有効なメールアドレスを入力してください。",
      accountStatus: "このアカウントは{status}されました。管理者に連絡してください。",
    },
    brand: {
      title: "あなたの仕事を明確に。",
      description: "プロジェクトを管理し、タスクを整理し、締め切りを守ります。",
    }
  },

  forgotPasswordModal: {
    title: "パスワードをリセット",
    description: "メールアドレスを入力してください。パスワードをリセットするためのリンクをお送りします。",
    emailPlaceholder: "your.email@example.com",
    button: "リセットリンクを送信",
    success: "{email} のアカウントが存在する場合、リセットリンクが送信されました。",
    close: "閉じる",
  },

  header: {
    dashboard: "ダッシュボード",
    notifications: {
      enable: "クリックして通知を有効にする",
      enabled: "通知が有効です",
    },
    theme: {
      toggle: "テーマを切り替える",
    },
    logout: "ログアウト",
  },
  sidebar: {
    today: "今日",
    upcoming: "近日予定",
    projects: "プロジェクト",
    newProjectPlaceholder: "新しいプロジェクト名...",
    addProjectButton: "プロジェクトを追加",
  },
  taskList: {
    addTask: "タスクを追加",
    searchPlaceholder: "タスク、ラベルを検索...",
    filter: {
      all: "すべて",
      completed: "完了",
      incomplete: "未完了",
    },
    sort: {
      priority: "優先度",
      dueDate: "期日",
    },
    empty: {
      title: "ここにタスクはありません",
      noMatch: "検索に一致するタスクはありません。",
      getStarted: "プロジェクトにタスクを追加して始めましょう！",
    },
    noProject: {
      title: "プロジェクトが選択されていません",
      description: "サイドバーからプロジェクトを作成または選択して開始してください。",
    }
  },
  taskItem: {
    priority: {
      low: "低",
      medium: "中",
      high: "高",
    },
    repeats: "{type}で繰り返す",
  },
  taskModal: {
    title: {
      edit: "タスクを編集",
      add: "新しいタスクを追加",
    },
    field: {
      title: "タイトル",
      description: "説明",
      dueDate: "期日",
      dueTime: "期限時刻",
      priority: "優先度",
      labels: "ラベル",
      labelsPlaceholder: "例：仕事, 緊急, マーケティング",
    },
    recurrence: {
      title: "繰り返し",
      checkbox: "繰り返しタスク",
      type: {
        daily: "毎日",
        weekly: "毎週",
        monthly: "毎月",
        yearly: "毎年",
      },
      yearly: {
        everyYear: "毎年",
        every2Years: "2年ごと",
        every3Years: "3年ごと",
        every5Years: "5年ごと",
      }
    },
    reminders: {
      title: "リマインダー",
      before: "前",
      after: "後",
      unit: {
        minutes: "分",
        hours: "時間",
        days: "日",
      },
      add: "リマインダーを追加",
    },
    button: {
      cancel: "キャンセル",
      close: "閉じる",
      save: "変更を保存",
      create: "タスクを作成",
    }
  },
  weekdays: {
    sun: "日",
    mon: "月",
    tue: "火",
    wed: "水",
    thu: "木",
    fri: "金",
    sat: "土",
  },
  profileModal: {
    title: "{username}のプロフィール設定",
    email: {
      title: "メールアドレス",
    },
    password: {
      title: "パスワードの変更"
    },
    field: {
      email: "メール",
      currentPassword: "現在のパスワード",
      newPassword: "新しいパスワード",
      confirmNewPassword: "新しいパスワードを確認",
    },
    error: {
      wrongPassword: "現在のパスワードが正しくありません。",
      passwordLength: "新しいパスワードは6文字以上である必要があります。",
      passwordMismatch: "新しいパスワードが一致しません。",
      noPasswordSet: "ソーシャルアカウントでサインアップした可能性があるため、パスワードを変更できません。",
    },
    success: {
        password: "パスワードが正常に更新されました！",
        email: "メールアドレスが正常に更新されました！",
    },
    button: {
      updatePassword: "パスワードを更新",
      updateEmail: "メールを更新",
    },
    passkey: {
      title: "パスキー（パスワードレスログイン）",
      none: "このデバイスに登録されているパスキーはありません。",
      registered: "パスキー #{index}",
      registerButton: "新しいパスキーを登録",
      registering: "ブラウザの指示に従ってパスキーを作成してください...",
      success: "パスキーが正常に登録されました！",
      error: "パスキーの登録に失敗しました：{error}",
    }
  },
  admin: {
    title: "JDue 管理者",
    userManagement: "ユーザー管理",
    role: {
      admin: "管理者",
      user: "ユーザー",
    },
    deleteUser: "削除",
    banUser: "禁止",
    deactivateUser: "無効化",
    activateUser: "有効化",
    currentUser: "(あなた)",
    confirmDelete: "このユーザーを削除してもよろしいですか？この操作は元に戻せません。",
    addUser: "ユーザーを追加",
    searchUsers: "ユーザーを検索...",
    status: "ステータス",
    statusType: {
      active: "アクティブ",
      banned: "禁止",
      deactivated: "無効"
    },
    actions: "アクション",
    systemStats: "システム統計",
    totalUsers: "総ユーザー数",
    totalProjects: "総プロジェクト数",
    totalTasks: "総タスク数",
    addUserModalTitle: "新規ユーザー作成",
    tempPassword: "仮パスワード",
    tempPasswordNotice: "ユーザーは最初のログイン時にこれを変更するように求められます。",
    profileSettings: "プロフィール設定"
  }
};

export default translations;