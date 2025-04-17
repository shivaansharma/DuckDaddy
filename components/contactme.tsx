'use client';

import { BackgroundLines } from "@/components/ui/backGroundLines";
import { useState } from "react";
import { motion } from "framer-motion";
import { LineShadowText } from "./magicui/line-shadow-text";

export default function ContactMe() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const response = await fetch('/api/mailSender', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
              });
          
              if (!response.ok) {
                throw new Error('Failed to send message');
              }
            setSubmitted(true);
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setSubmitted(false), 3000);
        } catch (error) {
            console.error('Error sending email:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const socialLinks = [
        { 
            name: 'GitHub', 
            url: 'https://github.com/shivaansharma', 
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
            ) 
        },
        { 
            name: 'LinkedIn', 
            url: 'https://www.linkedin.com/in/shivaan-sharma-2b7797168/?originalSubdomain=in', 
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
            ) 
        },
        { 
            name: 'Instagram', 
            url: 'https://www.instagram.com/shivaansharma/', 
            icon: (
                <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="currentColor"
>
  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913a5.885 5.885 0 0 0 1.384 2.126A5.868 5.868 0 0 0 4.14 23.37c.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558a5.898 5.898 0 0 0 2.126-1.384 5.86 5.86 0 0 0 1.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913a5.89 5.89 0 0 0-1.384-2.126A5.847 5.847 0 0 0 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 0 1-.899 1.382 3.744 3.744 0 0 1-1.38.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 0 1-1.379-.899 3.644 3.644 0 0 1-.9-1.38c-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 1 0 0-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 0 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/>
</svg>
            ) 
        },
        {
            name: 'LeetCode',
            url: 'https://leetcode.com/shivaansharma', 
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24" fill="currentColor">
                <path d="M180.4 129.1l-77-77a8 8 0 0 1 11.3-11.3l82.6 82.6a8 8 0 0 1 0 11.3l-82.6 82.6a8 8 0 0 1-11.3-11.3l77-77zM121.2 128l-62.2-62.2a8 8 0 0 1 11.3-11.3L133.9 128l-63.6 63.6a8 8 0 0 1-11.3-11.3L121.2 128z"/>
              </svg>
            )
          }
    ];

    return (
        <>
            {/* Decorative elements */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500 rounded-full opacity-10 blur-3xl "></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
            
            <div className="max-w-6xl w-full mx-auto z-10">
                <div className="text-center mb-12">
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-5xl font-bold mb-4"
                    >
                        Let's Connect
                    </motion.h1>
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '120px' }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="h-1 mx-auto bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 rounded-full"
                    ></motion.div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Contact Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800"
                    >
                        <div className="h-2 w-full bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500"></div>
                        <div className="p-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send me a message</h2>
                            
                            {submitted ? (
                                <div className="py-8 text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Thank you for reaching out. I'll get back to you soon.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                                        <input 
                                            id="name"
                                            name="name"
                                            type="text" 
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your name" 
                                            required
                                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                        <input 
                                            id="email"
                                            name="email"
                                            type="email" 
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="your.email@example.com" 
                                            required
                                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                                        <textarea 
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Your message" 
                                            rows="4" 
                                            required
                                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                        ></textarea>
                                    </div>
                                    
                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl font-medium transition duration-300 shadow-lg flex items-center justify-center"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending...
                                            </>
                                        ) : 'Send Message'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                    
                    {/* Connect Options */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-6"
                    >
                        <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800">
                            <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                            <div className="p-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Connect with me</h2>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    {socialLinks.map((link, index) => (
                                        <a 
                                            key={index}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-300"
                                        >
                                            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
                                                <span className="text-gray-700 dark:text-gray-300">
                                                    {link.icon}
                                                </span>
                                            </div>
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{link.name}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800">
                            <div className="h-2 w-full bg-gradient-to-r from-emerald-500 to-green-500"></div>
                            <div className="p-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Quick Response</h2>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    I typically respond to all messages within 24 hours. For urgent matters, direct email is recommended.
                                </p>
                                
                                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                    <span>Available for freelance opportunities</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}