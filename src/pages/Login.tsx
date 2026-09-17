import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, Globe, User, GraduationCap, Shield } from 'lucide-react';

export default function Login() {
  const { t, login, setShowLoading, toggleLanguage, language } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState<'role' | 'login'>('role');
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | 'admin'>('student');
  const [loginMethod, setLoginMethod] = useState<'phone' | 'google' | 'email'>('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleRoleSelect = (role: 'student' | 'teacher' | 'admin') => {
    setSelectedRole(role);
    setStep('login');
  };

  const handleLogin = () => {
    setShowLoading(true);
    setTimeout(() => {
      login(selectedRole);
      setShowLoading(false);
      if (selectedRole === 'admin') navigate('/admin');
      else if (selectedRole === 'teacher') navigate('/teacher');
      else navigate('/student');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 pt-4">
        <button onClick={() => step === 'login' ? setStep('role') : navigate('/')} className="p-2">
          <i className="fa-solid fa-arrow-left text-text-primary" />
        </button>
        <button onClick={toggleLanguage} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-medium">
          <Globe className="w-3.5 h-3.5 text-nepal-blue" />
          {language === 'en' ? 'नेपाली' : 'English'}
        </button>
      </div>

      <div className="flex-1 px-6 pt-8">
        {step === 'role' ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-bold text-text-primary mb-2">{t('selectRole')}</h2>
            <p className="text-sm text-text-secondary mb-8">{t('description')}</p>

            <div className="space-y-4">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => handleRoleSelect('student')}
                className="w-full card p-5 flex items-center gap-4 border-2 border-transparent hover:border-crimson/30 transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-crimson/10 flex items-center justify-center">
                  <GraduationCap className="w-7 h-7 text-crimson" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-text-primary">{t('studentParent')}</h3>
                  <p className="text-xs text-text-secondary mt-1">Search tutors, book sessions, track progress</p>
                </div>
                <i className="fa-solid fa-chevron-right text-gray-300 ml-auto" />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => handleRoleSelect('teacher')}
                className="w-full card p-5 flex items-center gap-4 border-2 border-transparent hover:border-nepal-blue/30 transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-nepal-blue/10 flex items-center justify-center">
                  <User className="w-7 h-7 text-nepal-blue" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-text-primary">{t('teacher')}</h3>
                  <p className="text-xs text-text-secondary mt-1">Create profile, manage schedule, earn</p>
                </div>
                <i className="fa-solid fa-chevron-right text-gray-300 ml-auto" />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => handleRoleSelect('admin')}
                className="w-full card p-5 flex items-center gap-4 border-2 border-transparent hover:border-success/30 transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center">
                  <Shield className="w-7 h-7 text-success" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-text-primary">{t('adminRole')}</h3>
                  <p className="text-xs text-text-secondary mt-1">Manage platform, users, and analytics</p>
                </div>
                <i className="fa-solid fa-chevron-right text-gray-300 ml-auto" />
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              {selectedRole === 'student' ? t('studentParent') : selectedRole === 'teacher' ? t('teacher') : t('adminRole')}
            </h2>
            <p className="text-sm text-text-secondary mb-6">{t('login')} / {t('register')}</p>

            {/* Login Methods */}
            <div className="flex gap-2 mb-6">
              {[
                { id: 'phone' as const, icon: Phone, label: t('phoneLogin') },
                { id: 'google' as const, icon: Globe, label: t('googleLogin') },
                { id: 'email' as const, icon: Mail, label: t('emailLogin') },
              ].map(method => (
                <button
                  key={method.id}
                  onClick={() => setLoginMethod(method.id)}
                  className={`flex-1 py-3 rounded-xl text-xs font-medium flex flex-col items-center gap-1.5 transition-all ${
                    loginMethod === method.id
                      ? 'bg-crimson text-white shadow-lg shadow-crimson/20'
                      : 'bg-white text-text-secondary border border-gray-200'
                  }`}
                >
                  <method.icon className="w-4 h-4" />
                  <span>{method.label.split(' ').pop()}</span>
                </button>
              ))}
            </div>

            {/* Form */}
            <div className="space-y-4">
              {loginMethod === 'phone' && (
                <>
                  <div>
                    <label className="text-xs font-medium text-text-secondary mb-1.5 block">{t('phoneNumber')}</label>
                    <div className="flex gap-2">
                      <span className="input-field w-20 text-center text-sm bg-warm-gray">+977</span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="98XXXXXXXX"
                        className="input-field flex-1"
                      />
                    </div>
                  </div>
                </>
              )}

              {loginMethod === 'email' && (
                <>
                  <div>
                    <label className="text-xs font-medium text-text-secondary mb-1.5 block">{t('fullName')}</label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Your full name"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-text-secondary mb-1.5 block">{t('email')}</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-text-secondary mb-1.5 block">{t('password')}</label>
                    <input
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="input-field"
                    />
                  </div>
                </>
              )}

              {loginMethod === 'google' && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
                    <Globe className="w-8 h-8 text-nepal-blue" />
                  </div>
                  <p className="text-sm text-text-secondary">Continue with your Google account</p>
                </div>
              )}

              <button onClick={handleLogin} className="btn-primary w-full py-4 text-base font-bold mt-4">
                {t('continueBtn')}
              </button>

              <p className="text-center text-xs text-text-secondary mt-4">
                By continuing, you agree to our Terms & Privacy Policy
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
