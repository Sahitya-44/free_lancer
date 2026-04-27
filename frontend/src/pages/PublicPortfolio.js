import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { portfolioAPI } from '../api/services';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaExternalLinkAlt } from 'react-icons/fa';

const PublicPortfolio = () => {
  const { portfolioUrl } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPortfolio();
  }, [portfolioUrl]);

  const fetchPortfolio = async () => {
    try {
      const { data } = await portfolioAPI.getPortfolio(portfolioUrl);
      setPortfolio(data);
    } catch (err) {
      setError('Portfolio not found');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-2xl">{error || 'Portfolio not found'}</div>
      </div>
    );
  }

  const { user, skills, projects, experiences } = portfolio;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-purple-500/20 py-12 px-6 lg:px-12 bg-black/30 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto text-center">
          {user.profileImage && (
            <motion.img
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              src={user.profileImage}
              alt={user.name}
              className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-purple-500 object-cover"
            />
          )}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-3"
          >
            {user.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-purple-400 mb-3"
          >
            {user.title}
          </motion.p>
          {user.location && (
            <p className="text-gray-400 mb-4">📍 {user.location}</p>
          )}
          {user.bio && (
            <p className="text-gray-300 max-w-2xl mx-auto text-lg mb-6">{user.bio}</p>
          )}

          {/* Social Links */}
          <div className="flex justify-center gap-4 flex-wrap">
            {user.socialLinks?.gmail && (
              <a href={`mailto:${user.socialLinks.gmail}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-red-500/20 rounded-full hover:bg-red-500/30 transition">
                <FaEnvelope size={24} />
              </a>
            )}
            {user.socialLinks?.linkedin && (
              <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-blue-500/20 rounded-full hover:bg-blue-500/30 transition">
                <FaLinkedin size={24} />
              </a>
            )}
            {user.socialLinks?.github && (
              <a href={user.socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-500/20 rounded-full hover:bg-gray-500/30 transition">
                <FaGithub size={24} />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Skills Section */}
      {skills && skills.length > 0 && (
        <section className="border-b border-purple-500/20 py-16 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">🎯 Skills</h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <motion.div
                  key={skill._id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-purple-500 rounded-full"
                >
                  {skill.name}
                  <span className="ml-2 text-xs text-gray-300">({skill.proficiency})</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects && projects.length > 0 && (
        <section className="border-b border-purple-500/20 py-16 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">💼 Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-lg overflow-hidden hover:border-purple-500/50 transition"
                >
                  {project.image && (
                    <img src={project.image} alt={project.title} className="w-full h-40 object-cover" />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-500/20 border border-blue-500/50 rounded text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-4">
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
                          <FaExternalLinkAlt /> Live
                        </a>
                      )}
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300 flex items-center gap-2">
                          <FaGithub /> GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {experiences && experiences.length > 0 && (
        <section className="py-16 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">🏢 Experience</h2>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <motion.div
                  key={exp._id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="p-6 bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-lg hover:border-purple-500/50 transition"
                >
                  <h3 className="text-2xl font-bold mb-1">{exp.role}</h3>
                  <p className="text-purple-400 font-semibold mb-3">{exp.company}</p>
                  {exp.description && <p className="text-gray-300 mb-3">{exp.description}</p>}
                  <p className="text-sm text-gray-400">
                    📅 {new Date(exp.startDate).toLocaleDateString()} - {exp.currentlyWorking ? 'Present' : new Date(exp.endDate).toLocaleDateString()}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-purple-500/20 py-8 px-6 lg:px-12 bg-black/30 text-center text-gray-400">
        <p>Built with ✨ using PortfolioHub</p>
      </footer>
    </div>
  );
};

export default PublicPortfolio;
