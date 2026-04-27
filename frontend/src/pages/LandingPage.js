import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaExternalLinkAlt } from 'react-icons/fa';

const LandingPage = () => {
  const templates = [
    { id: 1, name: 'Modern', color: 'from-blue-500 to-purple-600' },
    { id: 2, name: 'Elegant', color: 'from-pink-500 to-rose-600' },
    { id: 3, name: 'Minimal', color: 'from-green-500 to-teal-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <nav className="flex justify-between items-center px-6 lg:px-12 py-6 border-b border-purple-500/20">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          ✨ PortfolioHub
        </motion.div>
        <div className="flex gap-4">
          <motion.a href="/login" whileHover={{ scale: 1.05 }} className="px-6 py-2 rounded-lg border border-purple-500 text-purple-400 hover:bg-purple-500/10">
            Login
          </motion.a>
          <motion.a href="/signup" whileHover={{ scale: 1.05 }} className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:shadow-purple-500/50">
            Sign Up
          </motion.a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl"
        >
          <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Build Your <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Freelance Portfolio</span> Easily
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Create, customize, and share your professional portfolio in minutes. Showcase your skills, projects, and experience to the world.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <motion.a
              href="/signup"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-lg shadow-lg hover:shadow-purple-500/50"
            >
              🚀 Get Started
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-purple-400 rounded-lg font-semibold text-lg hover:bg-purple-500/10"
            >
              ▶️ View Demo
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 lg:px-12 bg-black/30">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-16">Powerful Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🎨', title: 'Create Portfolio', desc: 'Build a stunning portfolio in minutes' },
              { icon: '✨', title: 'Multiple Templates', desc: 'Choose from beautiful, modern templates' },
              { icon: '🔗', title: 'Share Public Link', desc: 'Get a unique URL to share with everyone' },
              { icon: '👥', title: 'Profile Management', desc: 'Easily manage your professional info' },
              { icon: '💼', title: 'Showcase Projects', desc: 'Display your best work and achievements' },
              { icon: '📊', title: 'Analytics Ready', desc: 'Track your portfolio views' },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-lg bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 hover:border-purple-500/50 transition"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Templates Preview */}
      <section className="py-20 px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-16">Beautiful Templates</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {templates.map((template, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className={`h-64 rounded-lg bg-gradient-to-br ${template.color} p-8 flex items-end cursor-pointer hover:shadow-2xl transition`}
              >
                <div>
                  <h3 className="text-2xl font-bold mb-2">{template.name} Template</h3>
                  <p className="text-white/80">Professional & Modern</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 py-12 px-6 lg:px-12 bg-black/50">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>© 2024 PortfolioHub. Made with ❤️ for freelancers.</p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="#" className="hover:text-purple-400 transition"><FaGithub size={24} /></a>
            <a href="#" className="hover:text-purple-400 transition"><FaLinkedin size={24} /></a>
            <a href="#" className="hover:text-purple-400 transition"><FaEnvelope size={24} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
