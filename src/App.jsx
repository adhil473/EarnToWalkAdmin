import { BrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import AppContent from "./route/AppContent";
import { ToastProvider } from "./context/ToastContext";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <AppContent/>
          <Toaster position="top-center" />
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App
