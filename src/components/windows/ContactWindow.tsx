import React, { useState } from 'react';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';
import supabase from '../../../supabaseClient'; // Supabase enabled

const ContactWindow: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.from('messages').insert([formData]);

      if (error) {
        console.error('Supabase insert error:', error);
        alert('Failed to send message: ' + error.message);
      } else {
        setIsSubmitted(true);
      }
    } catch (err) {
      alert('Submission failed.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-2 h-full overflow-auto">
      <div className="bg-pink-light p-4 border-2 border-pink-dark min-h-full">
        <h2 className="text-pink-primary text-lg mb-4 glow-text">Contact Me</h2>

        {isSubmitted ? (
          <div className="bg-pink-bg p-4 border-2 border-pink-dark mb-4">
            <p className="text-xs mb-2">Thanks for your message!</p>
            <p className="text-xs">I'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="mb-3">
              <label htmlFor="name" className="block text-xs mb-1">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 text-xs bg-pink-bg border-2 border-pink-dark focus:border-pink-primary"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="block text-xs mb-1">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 text-xs bg-pink-bg border-2 border-pink-dark focus:border-pink-primary"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="block text-xs mb-1">Message:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-2 text-xs bg-pink-bg border-2 border-pink-dark focus:border-pink-primary min-h-[100px]"
              />
            </div>

            <button
              type="submit"
              className="pixel-button text-xs"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}

        <div>
          <h3 className="text-pink-primary text-sm mb-2">Connect With Me</h3>
          <div className="space-y-2">
            <a
              href="mailto:anushkasinghpratap@gmail.com"
              className="flex items-center text-xs text-pink-dark hover:text-pink-primary"
            >
              <Mail size={14} className="mr-2" />
              navyasreeboddu@gmail.com
            </a>

            <a
              href="https://github.com/navya1405"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-xs text-pink-dark hover:text-pink-primary"
            >
              <Github size={14} className="mr-2" />
              github.com/navya1405
            </a>

            <a
              href="https://www.linkedin.com/in/navyasree-boddu-134a04296/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-xs text-pink-dark hover:text-pink-primary"
            >
              <Linkedin size={14} className="mr-2" />
              linkedin.com/in/navyasree
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactWindow;
