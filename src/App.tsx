import { useState, FormEvent, Suspense } from 'react';
import Spline from '@splinetool/react-spline';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function App() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [splineError, setSplineError] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://hook.eu2.make.com/jckkhllq8kvmctds52n5qnkpy22ebiwe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Reset success message after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setError('Failed to send message. Please try again later.');
      console.error('Error sending form:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const onSplineError = (e: any) => {
    console.error('Spline scene failed to load:', e);
    setSplineError(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Logo in the top-left corner */}
      <div className="absolute top-4 left-4">
        <img src="/robotpic.png" alt="Logo" className="h-16 w-16 object-contain" />
      </div>

      {/* Spline element */}
      {!splineError && (
        <div className="absolute top-0 right-0 w-1/2 h-screen pointer-events-none">
          <Suspense fallback={<div>Loading 3D scene...</div>}>
            <Spline 
              scene="https://prod.spline.design/starterscenecopy-4e1fb6aa3d63736f3e4160ac1c3a2d8f/scene.splinecode"
              onError={onSplineError}
            />
          </Suspense>
        </div>
      )}
      
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Contact Us</h2>
          <p className="mt-2 text-sm text-gray-600">
            We'd love to hear from you. Send us a message!
          </p>
        </div>

        <div className="mt-8">
          <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
            <form className="mb-0 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="subject"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    rows={4}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    isLoading 
                      ? 'bg-indigo-400 cursor-not-allowed' 
                      : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  }`}
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>

            {submitted && (
              <div className="mt-4 p-4 text-sm text-green-700 bg-green-100 rounded-md">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}

            {error && (
              <div className="mt-4 p-4 text-sm text-red-700 bg-red-100 rounded-md">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;