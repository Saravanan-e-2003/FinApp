import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import { registerUser, loginUser, validateEmail, validatePassword } from '../CardinalStorage';

const Auth = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    // Clear success message when user starts typing
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.errors[0];
      }
    }

    // Sign-up specific validation
    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});
    setSuccessMessage('');

    try {
      let result;
      
      if (isLogin) {
        // Handle login
        result = await loginUser({
          email: formData.email,
          password: formData.password
        });
      } else {
        // Handle sign-up
        result = await registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
      }

      if (result && result.success) {
        setSuccessMessage(result.message || 'Success!');
        // Small delay to show success message, then redirect
        setTimeout(() => {
          onAuthSuccess();
        }, 1000);
      } else {
        // Handle specific error cases
        const errorMessage = result?.message || 'Authentication failed';
        
        if (errorMessage.toLowerCase().includes('email')) {
          setErrors({ email: errorMessage });
        } else if (errorMessage.toLowerCase().includes('password')) {
          setErrors({ password: errorMessage });
        } else if (errorMessage.toLowerCase().includes('exist')) {
          setErrors({ email: errorMessage });
        } else {
          setErrors({ general: errorMessage });
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      setErrors({ general: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    });
    setErrors({});
    setSuccessMessage('');
  };

  return (
    <div className="min-h-screen bg-[#fff7e4] overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md my-8">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="flex justify-center mb-2">
            <img
              src="/icon.svg"
              alt="CashRack Logo"
              className="h-16 w-16 bg-[#fff7e4] p-3 border-4 border-[#1f1a14] rounded-lg shadow-[4px_4px_0_#1f1a14]"
            />
          </div>
          <h1 className="text-3xl font-bold text-[#1f1a14] mb-2">
            Welcome to CashRack
          </h1>
          <p className="text-[#1f1a14]/70">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 border-2 border-green-500 rounded-lg text-green-700 text-center">
            {successMessage}
          </div>
        )}

        {/* General Error Message */}
        {errors.general && (
          <div className="mb-4 p-3 bg-red-100 border-2 border-red-500 rounded-lg text-red-700 text-center">
            {errors.general}
          </div>
        )}

        {/* Auth Form */}
        <div className="bg-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[6px_6px_0_#1f1a14] p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field - only for sign-up */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-[#1f1a14] mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1f1a14]/60 h-5 w-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg bg-[#fff7e4] text-[#1f1a14] placeholder-[#1f1a14]/50 focus:outline-none focus:ring-2 focus:ring-[#1f1a14]/20 disabled:opacity-50 disabled:cursor-not-allowed ${
                      errors.name ? 'border-red-500' : 'border-[#1f1a14]'
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
            )}

            {/* Email field */}
            <div>
              <label className="block text-sm font-semibold text-[#1f1a14] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1f1a14]/60 h-5 w-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg bg-[#fff7e4] text-[#1f1a14] placeholder-[#1f1a14]/50 focus:outline-none focus:ring-2 focus:ring-[#1f1a14]/20 disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.email ? 'border-red-500' : 'border-[#1f1a14]'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password field */}
            <div>
              <label className="block text-sm font-semibold text-[#1f1a14] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1f1a14]/60 h-5 w-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={`w-full pl-10 pr-12 py-3 border-2 rounded-lg bg-[#fff7e4] text-[#1f1a14] placeholder-[#1f1a14]/50 focus:outline-none focus:ring-2 focus:ring-[#1f1a14]/20 disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.password ? 'border-red-500' : 'border-[#1f1a14]'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#1f1a14]/60 hover:text-[#1f1a14] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password field - only for sign-up */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-[#1f1a14] mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1f1a14]/60 h-5 w-5" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className={`w-full pl-10 pr-12 py-3 border-2 rounded-lg bg-[#fff7e4] text-[#1f1a14] placeholder-[#1f1a14]/50 focus:outline-none focus:ring-2 focus:ring-[#1f1a14]/20 disabled:opacity-50 disabled:cursor-not-allowed ${
                      errors.confirmPassword ? 'border-red-500' : 'border-[#1f1a14]'
                    }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#1f1a14]/60 hover:text-[#1f1a14] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1f1a14] text-[#fff7e4] py-3 px-4 rounded-lg font-semibold border-2 border-[#1f1a14] hover:bg-[#fff7e4] hover:text-[#1f1a14] transition-colors duration-200 shadow-[4px_4px_0_#1f1a14] hover:shadow-[2px_2px_0_#1f1a14] hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#1f1a14] disabled:hover:text-[#fff7e4] disabled:hover:shadow-[4px_4px_0_#1f1a14] disabled:hover:translate-x-0 disabled:hover:translate-y-0"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#fff7e4] mr-2"></div>
                  {isLogin ? 'Signing In...' : 'Signing Up...'}
                </div>
              ) : (
                isLogin ? 'Sign In' : 'Sign Up'
              )}
            </button>
          </form>

          {/* Toggle Auth Mode */}
          <div className="mt-6 text-center">
            <p className="text-[#1f1a14]/70 mb-2">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
            </p>
            <button
              onClick={toggleAuthMode}
              disabled={isLoading}
              className="text-[#1f1a14] font-semibold hover:underline focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLogin ? 'Create Account' : 'Sign In'}
            </button>
          </div>

          {/* Forgot Password - only show for login */}
          {isLogin && (
            <div className="mt-4 text-center">
              <button 
                disabled={isLoading}
                className="text-[#1f1a14]/70 text-sm hover:text-[#1f1a14] hover:underline focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Forgot your password?
              </button>
            </div>
          )}
        </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-[#1f1a14]/50 text-sm">
              Secure financial management for everyone
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth; 