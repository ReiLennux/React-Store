import { createContext, useContext, useState, ReactNode } from 'react';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertState {
  type: AlertType;
  message: string;
  visible: boolean;
}

interface AlertContextType {
  showAlert: (message: string, type?: AlertType, duration?: number) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alert, setAlert] = useState<AlertState>({
    type: 'info',
    message: '',
    visible: false,
  });

  const showAlert = (message: string, type: AlertType = 'info', duration = 3000) => {
    setAlert({ type, message, visible: true });

    setTimeout(() => {
      setAlert((prev) => ({ ...prev, visible: false }));
    }, duration);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert.visible && (
        <div className="fixed bottom-6 right-6 z-50">
          <div
            className={`p-4 rounded-md border shadow-lg max-w-sm
              ${alert.type === 'success' && 'bg-green-100 text-green-800 border-green-400'}
              ${alert.type === 'error' && 'bg-red-100 text-red-800 border-red-400'}
              ${alert.type === 'warning' && 'bg-yellow-100 text-yellow-800 border-yellow-400'}
              ${alert.type === 'info' && 'bg-blue-100 text-blue-800 border-blue-400'}
            `}
          >
            {alert.message}
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
}

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert debe usarse dentro de <AlertProvider>');
  }
  return context;
};
