import { useState } from 'react';
import login_img from '@/assets/logo.png';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // true: login, false: register


  return (
    <div className="w-full h-screen grid grid-cols-1 md:grid-cols-5 overflow-hidden relative">
      {/* Login Form */}
      <div className={`${isLogin ? 'col-span-3' : 'hidden'} flex items-center justify-center px-6 transition-all duration-500 ease-in-out`}>
          <LoginForm/>
      </div>
      {/* Imagen lateral */}
      <div className={`col-span-2 bg-slate-200 hidden md:flex flex-col items-center justify-center p-6 transition-transform duration-500 ease-in-out ${isLogin ? 'translate-x- rounded-l-3xl' : 'translate-x-1 rounded-r-3xl'}`}>
        <img src={login_img} alt="Login" className="max-w-xs mb-6" />
        <p className="text-center text-sm">
          {isLogin ? (
            <>
              Not registered yet?{' '}
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="underline hover:text-blue-700"
              >
                Register here
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="underline hover:text-blue-700"
              >
                Go to login
              </button>
            </>
          )}
        </p>
      </div>
      {/* Register Form*/}
      <div className={`${isLogin ? 'hidden' : 'col-span-3'} flex items-center justify-center px-6 transition-all duration-500 ease-in-out`}>
        <RegisterForm />
      </div>
    </div>
  );
}
