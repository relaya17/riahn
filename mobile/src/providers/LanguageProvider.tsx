import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (language: string) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  he: {
    'auth.login': 'התחברות',
    'auth.register': 'הרשמה',
    'auth.email': 'אימייל',
    'auth.password': 'סיסמה',
    'auth.confirmPassword': 'אישור סיסמה',
    'auth.forgotPassword': 'שכחת סיסמה?',
    'auth.loginButton': 'התחבר',
    'auth.registerButton': 'הרשם',
    'dashboard.welcome': 'ברוכים הבאים',
    'dashboard.lessons': 'שיעורים',
    'dashboard.chat': 'צ\'אט',
    'dashboard.profile': 'פרופיל',
    'dashboard.settings': 'הגדרות',
    'lessons.title': 'שיעורים',
    'lessons.progress': 'התקדמות',
    'lessons.start': 'התחל שיעור',
    'chat.title': 'צ\'אט',
    'chat.send': 'שלח',
    'chat.typeMessage': 'הקלד הודעה...',
    'profile.title': 'פרופיל',
    'profile.edit': 'ערוך',
    'profile.save': 'שמור',
    'settings.title': 'הגדרות',
    'settings.language': 'שפה',
    'settings.theme': 'ערכת נושא',
    'settings.notifications': 'התראות',
    'common.loading': 'טוען...',
    'common.error': 'שגיאה',
    'common.success': 'הצלחה',
    'common.cancel': 'ביטול',
    'common.save': 'שמור',
    'common.delete': 'מחק',
    'common.edit': 'ערוך',
    'common.back': 'חזור',
    'common.next': 'הבא',
    'common.previous': 'הקודם',
    'common.finish': 'סיום',
  },
  en: {
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.loginButton': 'Login',
    'auth.registerButton': 'Register',
    'dashboard.welcome': 'Welcome',
    'dashboard.lessons': 'Lessons',
    'dashboard.chat': 'Chat',
    'dashboard.profile': 'Profile',
    'dashboard.settings': 'Settings',
    'lessons.title': 'Lessons',
    'lessons.progress': 'Progress',
    'lessons.start': 'Start Lesson',
    'chat.title': 'Chat',
    'chat.send': 'Send',
    'chat.typeMessage': 'Type a message...',
    'profile.title': 'Profile',
    'profile.edit': 'Edit',
    'profile.save': 'Save',
    'settings.title': 'Settings',
    'settings.language': 'Language',
    'settings.theme': 'Theme',
    'settings.notifications': 'Notifications',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.finish': 'Finish',
  },
  ar: {
    'auth.login': 'تسجيل الدخول',
    'auth.register': 'التسجيل',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.confirmPassword': 'تأكيد كلمة المرور',
    'auth.forgotPassword': 'نسيت كلمة المرور؟',
    'auth.loginButton': 'تسجيل الدخول',
    'auth.registerButton': 'التسجيل',
    'dashboard.welcome': 'مرحباً',
    'dashboard.lessons': 'الدروس',
    'dashboard.chat': 'المحادثة',
    'dashboard.profile': 'الملف الشخصي',
    'dashboard.settings': 'الإعدادات',
    'lessons.title': 'الدروس',
    'lessons.progress': 'التقدم',
    'lessons.start': 'ابدأ الدرس',
    'chat.title': 'المحادثة',
    'chat.send': 'إرسال',
    'chat.typeMessage': 'اكتب رسالة...',
    'profile.title': 'الملف الشخصي',
    'profile.edit': 'تعديل',
    'profile.save': 'حفظ',
    'settings.title': 'الإعدادات',
    'settings.language': 'اللغة',
    'settings.theme': 'المظهر',
    'settings.notifications': 'الإشعارات',
    'common.loading': 'جاري التحميل...',
    'common.error': 'خطأ',
    'common.success': 'نجح',
    'common.cancel': 'إلغاء',
    'common.save': 'حفظ',
    'common.delete': 'حذف',
    'common.edit': 'تعديل',
    'common.back': 'رجوع',
    'common.next': 'التالي',
    'common.previous': 'السابق',
    'common.finish': 'إنهاء',
  },
};

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState('he');

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage) {
        setCurrentLanguage(savedLanguage);
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  };

  const setLanguage = async (language: string) => {
    try {
      setCurrentLanguage(language);
      await AsyncStorage.setItem('language', language);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    const translation = translations[currentLanguage as keyof typeof translations]?.[key] || key;
    
    if (params) {
      return Object.entries(params).reduce(
        (str, [paramKey, paramValue]) => 
          str.replace(`{{${paramKey}}}`, String(paramValue)),
        translation
      );
    }
    
    return translation;
  };

  return (
    <LanguageContext.Provider value={{currentLanguage, setLanguage, t}}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
