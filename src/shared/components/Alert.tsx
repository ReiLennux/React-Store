import { useEffect } from 'react';
import { XCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';

const variants = {
  success: {
    icon: <CheckCircle className="text-green-600" />,
    bg: 'bg-green-100 text-green-800 border-green-400',
  },
  error: {
    icon: <XCircle className="text-red-600" />,
    bg: 'bg-red-100 text-red-800 border-red-400',
  },
  warning: {
    icon: <AlertTriangle className="text-yellow-600" />,
    bg: 'bg-yellow-100 text-yellow-800 border-yellow-400',
  },
  info: {
    icon: <Info className="text-blue-600" />,
    bg: 'bg-blue-100 text-blue-800 border-blue-400',
  },
};

type AlertProps = {
  type: keyof typeof variants;
  message: string;
  onClose?: () => void;
  duration?: number; // en milisegundos
};

export function Alert({ type = 'info', message, onClose, duration = 3000 }: AlertProps) {
  const { icon, bg } = variants[type];

  useEffect(() => {
    if (!onClose) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={`flex items-start gap-3 p-4 border rounded-md ${bg}`}>
      <div className="mt-1">{icon}</div>
      <div className="flex-1">{message}</div>
      {onClose && (
        <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-800">
          ✕
        </button>
      )}
    </div>
  );
}
