import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ show: false, message: '', icon: null });

  const showToast = (message, icon = null) => {
    setToast({ show: true, message, icon });
    setTimeout(() => setToast({ show: false, message: '', icon: null }), 2000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.show && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#00d1b2] to-[#00a48c] text-white px-4 md:px-6 py-2 md:py-3 rounded-lg shadow-lg flex items-center gap-2 z-50">
          {toast.icon && toast.icon}
          <span className="font-semibold text-sm md:text-base">{toast.message}</span>
        </div>
      )}
    </ToastContext.Provider>
  );
};
