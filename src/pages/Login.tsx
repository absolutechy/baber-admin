import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Card } from '../components/common';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      setLoading(true);
      const success = await login(email, password);
      
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen">
      <div className="hidden w-1/2 items-center justify-center bg-orange-500 p-12 text-white lg:flex">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-6">
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3z"/>
          </svg>
          <h1 className="text-4xl font-bold mb-3">Hello again</h1>
          <p className="text-lg">Login to continue</p>
        </div>
      </div>
      <div className="flex w-full items-center justify-center bg-gray-50 p-8 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 text-left">
            <h2 className="text-2xl font-bold text-gray-800">Login</h2>
            <p className="mt-2 text-gray-500">Welcome back. Enter your email and password, let's hope you remember them this time.</p>
          </div>

          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              id="email"
              type="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
            
            <Input
              id="password"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
            
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="form-checkbox h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me for 30 days
              </label>
            </div>
            
            <Button
              type="submit"
              disabled={loading}
              fullWidth
              size="lg"
              icon={loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : undefined}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          
          <Card className="mt-6" bodyClassName="p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Demo Credentials</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-600">Email:</div>
              <div className="font-medium">admin@barber.com</div>
              <div className="text-gray-600">Password:</div>
              <div className="font-medium">admin123</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
  