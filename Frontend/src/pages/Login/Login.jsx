import React, { useState } from 'react';
import styles from './Login.module.css';
import logo from '../../assets/aetherlearn-high-resolution-logo-white-transparent.png'


const Button = ({ children, onClick, type, className, variant }) => (
  <button
    onClick={onClick}
    type={type || 'button'}
    className={`${styles.button} ${variant === 'link' ? styles.link : ''} ${className}`}
  >
    {children}
  </button>
);

const Input = ({ id, type, placeholder, value, onChange, required }) => (
  <input
    id={id}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required={required}
    className={styles.input}
  />
);

const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className={styles.label}>
    {children}
  </label>
);

function ForgotPasswordForm({ onBackToSignIn }) {
  const [resetEmail, setResetEmail] = useState('');

  const handleResetPassword = (e) => {
    e.preventDefault();
    console.log('Reset password for:', resetEmail);
  };

  return (
    <div className="space-y-4">
      <h2 className={styles.heading}>Forgot Password</h2>
      <form onSubmit={handleResetPassword} className={styles.form}>
        <div className={styles.formGroup}>
          <Label htmlFor="reset-email">Email</Label>
          <Input
            id="reset-email"
            type="email"
            placeholder="Enter your email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className={styles.button + ' ' + styles.fullWidth}>Reset Password</Button>
      </form>
      <div className={styles.link} onClick={onBackToSignIn}>
        Back to Sign In
      </div>
    </div>
  );
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log('Sign in:', email, password);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('Sign up:', name, email, password);
  };

  return (
    <div className={styles.container}>
      {/* Logo Side */}
      <div className={styles.logoSide}>
        <img src={logo} alt="Company Logo" />
      </div>

      <div className={styles.divider}></div>

      {/* Form Side */}
      <div className={styles.formSide}>
        <div className={styles.maxWidth}>
          {showForgotPassword ? (
            <ForgotPasswordForm onBackToSignIn={() => setShowForgotPassword(false)} />
          ) : (
            <>
              <h1 className={styles.heading}>Welcome</h1>
              <div className={styles.tabButtons}>
                <div
                  className={`${styles.tabButton} ${activeTab === 'signin' ? styles.active : styles.inactive}`}
                  onClick={() => setActiveTab('signin')}
                >
                  Sign In
                </div>
                <div
                  className={`${styles.tabButton} ${activeTab === 'signup' ? styles.active : styles.inactive}`}
                  onClick={() => setActiveTab('signup')}
                >
                  Sign Up
                </div>
              </div>
              {activeTab === 'signin' ? (
                <form onSubmit={handleSignIn} className={styles.form}>
                  <div className={styles.formGroup}>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.link} onClick={() => setShowForgotPassword(true)}>
                    Forgot Password?
                  </div>
                  <Button type="submit" className={styles.button + ' ' + styles.fullWidth}>Sign In</Button>
                </form>
              ) : (
                <form onSubmit={handleSignUp} className={styles.form}>
                  <div className={styles.formGroup}>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className={styles.button + ' ' + styles.fullWidth}>Sign Up</Button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
