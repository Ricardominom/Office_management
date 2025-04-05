import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext'; // Importa el ThemeContext

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores
  const navigate = useNavigate();
  const { theme } = useTheme(); // Usa el ThemeContext para obtener el tema actual

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    setError(null); // Limpia el error si todo está bien
    navigate('/agreements'); // Redirige directamente a la página de acuerdos
  };

  const getStyles = () => ({
    textColor: theme === 'dark' ? 'text-gray-200' : 'text-gray-800',
    inputBgColor: theme === 'dark' ? 'bg-gray-700' : 'bg-secondary',
    inputBorderColor: theme === 'dark' ? 'border-gray-600' : 'border-gray-300',
    formBgColor: theme === 'dark' ? 'bg-gray-800' : 'bg-accent',
    placeholderColor: theme === 'dark' ? 'placeholder-gray-500' : 'placeholder-gray-400',
  });

  const styles = getStyles();

  return (
    <div className={`min-h-screen flex flex-col justify-center py-6 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-background'}`}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Building2 className={`h-10 w-10 sm:h-12 sm:w-12 ${styles.textColor}`} />
        </div>
        <h2 className={`mt-4 sm:mt-6 text-center text-2xl sm:text-3xl font-extrabold ${styles.textColor}`}>
          Plataforma UNO
        </h2>
        <p className={`mt-1 sm:mt-2 text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          Gestión de Oficina Presidencial
        </p>
      </div>

      <div className="mt-6 sm:mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className={`py-6 px-4 sm:py-8 sm:px-6 shadow sm:rounded-lg ${styles.formBgColor}`}>
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${styles.textColor}`}>
                Correo electrónico
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`appearance-none block w-full px-3 py-2 ${styles.inputBgColor} ${styles.inputBorderColor} border rounded-md shadow-sm ${styles.placeholderColor} focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${styles.textColor}`}
                  aria-label="Correo electrónico"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${styles.textColor}`}>
                Contraseña
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`appearance-none block w-full px-3 py-2 ${styles.inputBgColor} ${styles.inputBorderColor} border rounded-md shadow-sm ${styles.placeholderColor} focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${styles.textColor}`}
                  aria-label="Contraseña"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 sm:py-3 sm:px-6 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
