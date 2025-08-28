import React, { useState } from 'react';
import { X, Mail } from 'lucide-react';
import { EmailPasswordAuth } from './EmailPasswordAuth';

export function LoginModal({ onClose }) {
  const [isLoginMode, setIsLoginMode] = useState(true); // true for login, false for signup

  const handleEmailPasswordAuth = async (authData) => {
    // In a real application, this would connect to your backend
    // For now, we'll simulate authentication
       
    if (authData.type === 'signup') {
      // Simulate user creation
      const newUser = {
        id: Date.now().toString(),
        name: authData.name,
        email: authData.email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(authData.name)}&background=6366f1&color=fff`,
        provider: 'email'
      };
      
      // Store user data (in real app, this would be handled by backend)
      localStorage.setItem('algoforge_user', JSON.stringify(newUser));
      
      // Simulate successful signup
      window.location.reload(); // Refresh to update auth state
      return { success: true };
    } else {
      // Simulate login validation
      // In real app, this would validate credentials against backend
      
      // For demo purposes, accept any email/password combination
      const simulatedUser = {
        id: 'email_user',
        name: authData.email.split('@')[0],
        email: authData.email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(authData.email.split('@')[0])}&background=6366f1&color=fff`,
        provider: 'email'
      };
      
      localStorage.setItem('algoforge_user', JSON.stringify(simulatedUser));
      window.location.reload();
      return { success: true };
    }
  };

  return (
    <div className="fixed inset-0 z-30 grid place-items-center bg-black/60 p-3">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#0f1117] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
          <div className="text-sm font-semibold tracking-tight">Sign in to AlgoForge</div>
          <button onClick={onClose} className="rounded-xl border border-white/10 p-1.5 hover:border-white/20">
            <X className="h-4 w-4"/>
          </button>
        </div>
        <div className="p-6">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-500"/>
            <h2 className="text-lg font-semibold text-gray-100">
              {isLoginMode ? 'Sign in to your account' : 'Create your account'}
            </h2>
            <p className="text-sm text-gray-400">
              {isLoginMode
                ? 'Enter your credentials to access your account'
                : 'Join AlgoForge to track your DSA journey'
              }
            </p>
          </div>
          
          {/* Email/Password Authentication */}
          <EmailPasswordAuth
            onSubmit={handleEmailPasswordAuth}
            onToggleMode={() => setIsLoginMode(!isLoginMode)}
            isLogin={isLoginMode}
          />
          
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
