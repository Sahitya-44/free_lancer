import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { profileAPI, skillAPI, projectAPI, experienceAPI } from '../api/services';
import { useAuth } from '../context/AuthContext';
import { FaEdit, FaPlus, FaEye, FaShare } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({ skills: 0, projects: 0, experiences: 0 });
  const [activeMenu, setActiveMenu] = useState('profile');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [skillsRes, projectsRes, experiencesRes] = await Promise.all([
        skillAPI.getSkills(),
        projectAPI.getProjects(),
        experienceAPI.getExperiences(),
      ]);

      setStats({
        skills: skillsRes.data.length,
        projects: projectsRes.data.length,
        experiences: experiencesRes.data.length,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { id: 'profile', label: '👤 Profile', icon: FaEdit },
    { id: 'skills', label: '🎯 Skills', icon: FaPlus },
    { id: 'projects', label: '💼 Projects', icon: FaPlus },
    { id: 'experience', label: '🏢 Experience', icon: FaPlus },
    { id: 'preview', label: '👁️ Preview', icon: FaEye },
    { id: 'share', label: '🔗 Share', icon: FaShare },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <nav className="flex justify-between items-center px-6 lg:px-12 py-6 border-b border-purple-500/20 bg-black/30 backdrop-blur-xl">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          ✨ PortfolioHub
        </h1>
        <div className="flex items-center gap-6">
          <p className="text-sm text-gray-300">Welcome, <span className="font-bold text-purple-400">{user?.name}</span> 👋</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg hover:bg-red-500/30 transition"
          >
            Logout
          </motion.button>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="hidden lg:flex flex-col w-64 border-r border-purple-500/20 bg-black/30 backdrop-blur-xl min-h-screen p-6">
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Menu</h2>
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    activeMenu === item.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'text-gray-300 hover:bg-purple-500/10'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 lg:p-12">
          {activeMenu === 'profile' && <ProfileSection user={user} onUpdate={fetchStats} />}
          {activeMenu === 'skills' && <SkillsSection onUpdate={fetchStats} />}
          {activeMenu === 'projects' && <ProjectsSection onUpdate={fetchStats} />}
          {activeMenu === 'experience' && <ExperienceSection onUpdate={fetchStats} />}
          {activeMenu === 'preview' && <PortfolioPreview user={user} />}
          {activeMenu === 'share' && <SharePortfolio user={user} />}
        </div>
      </div>
    </div>
  );
};

// Profile Section Component
const ProfileSection = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    title: user?.title || '',
    bio: user?.bio || '',
    location: user?.location || '',
    availability: user?.availability || 'not_available',
    profileImage: user?.profileImage || '',
    socialLinks: user?.socialLinks || {},
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social_')) {
      const key = name.replace('social_', '');
      setFormData(prev => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [key]: value },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await profileAPI.updateProfile(formData);
      onUpdate();
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl"
    >
      <h2 className="text-3xl font-bold mb-8">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Image */}
        <div>
          <label className="block text-sm font-medium mb-2">Profile Image URL</label>
          <input
            type="url"
            name="profileImage"
            value={formData.profileImage}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full px-4 py-2 bg-white/10 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white/10 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Professional Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Frontend Developer"
            className="w-full px-4 py-2 bg-white/10 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium mb-2">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself..."
            rows="4"
            className="w-full px-4 py-2 bg-white/10 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="City, Country"
            className="w-full px-4 py-2 bg-white/10 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Availability */}
        <div>
          <label className="block text-sm font-medium mb-2">Availability</label>
          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white/10 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
          >
            <option value="not_available">Not Available</option>
            <option value="open">Open to Work</option>
          </select>
        </div>

        {/* Social Links */}
        <div className="border-t border-purple-500/20 pt-6">
          <h3 className="text-xl font-bold mb-4">Social Links</h3>
          {['gmail', 'linkedin', 'github', 'twitter', 'website'].map((social) => (
            <div key={social} className="mb-4">
              <label className="block text-sm font-medium mb-2 capitalize">{social}</label>
              <input
                type="url"
                name={`social_${social}`}
                value={formData.socialLinks[social] || ''}
                onChange={handleChange}
                placeholder={`Your ${social} URL`}
                className="w-full px-4 py-2 bg-white/10 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 font-bold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50"
        >
          {loading ? 'Saving...' : '💾 Save Changes'}
        </motion.button>
      </form>
    </motion.div>
  );
};

// Skills Section Component
const SkillsSection = ({ onUpdate }) => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: '', proficiency: 'Intermediate' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const { data } = await skillAPI.getSkills();
      setSkills(data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkill.name.trim()) return;

    setLoading(true);
    try {
      await skillAPI.addSkill(newSkill);
      setNewSkill({ name: '', proficiency: 'Intermediate' });
      fetchSkills();
      onUpdate();
    } catch (error) {
      console.error('Error adding skill:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSkill = async (id) => {
    try {
      await skillAPI.deleteSkill(id);
      fetchSkills();
      onUpdate();
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl"
    >
      <h2 className="text-3xl font-bold mb-8">🎯 Skills</h2>

      <form onSubmit={handleAddSkill} className="mb-8 p-6 bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            placeholder="Skill name (e.g., React)"
            className="px-4 py-2 bg-white/10 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
          />
          <select
            value={newSkill.proficiency}
            onChange={(e) => setNewSkill({ ...newSkill, proficiency: e.target.value })}
            className="px-4 py-2 bg-white/10 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
            <option>Expert</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.02 }}
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? 'Adding...' : '+ Add Skill'}
          </motion.button>
        </div>
      </form>

      <div className="space-y-3">
        {skills.map((skill) => (
          <motion.div
            key={skill._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex justify-between items-center p-4 bg-white/5 border border-purple-500/20 rounded-lg hover:bg-white/10 transition"
          >
            <div>
              <p className="font-semibold">{skill.name}</p>
              <p className="text-sm text-gray-400">{skill.proficiency}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => handleDeleteSkill(skill._id)}
              className="px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg hover:bg-red-500/30 transition"
            >
              Delete
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Projects Section Component
const ProjectsSection = ({ onUpdate }) => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    image: '',
    technologies: [],
    liveLink: '',
    githubLink: '',
  });
  const [loading, setLoading] = useState(false);
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await projectAPI.getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleAddTech = () => {
    if (techInput.trim()) {
      setNewProject(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()]
      }));
      setTechInput('');
    }
  };

  const handleRemoveTech = (index) => {
    setNewProject(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index)
    }));
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProject.title.trim() || !newProject.description.trim()) return;

    setLoading(true);
    try {
      await projectAPI.addProject(newProject);
      setNewProject({ title: '', description: '', image: '', technologies: [], liveLink: '', githubLink: '' });
      setShowForm(false);
      fetchProjects();
      onUpdate();
    } catch (error) {
      console.error('Error adding project:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await projectAPI.deleteProject(id);
      fetchProjects();
      onUpdate();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">💼 Projects</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold"
        >
          {showForm ? 'Cancel' : '+ Add Project'}
        </motion.button>
      </div>

      {showForm && (
        <motion.form
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleAddProject}
          className="mb-8 p-6 bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-lg space-y-4"
        >
          <input
            type="text"
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            placeholder="Project title"
            className="w-full px-4 py-2 bg-white/10 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
          />
          <textarea
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            placeholder="Project description"
            rows="3"
            className="w-full px-4 py-2 bg-white/10 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
          />
          <input
            type="url"
            value={newProject.image}
            onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
            placeholder="Project image URL"
            className="w-full px-4 py-2 bg-white/10 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
          />
          <div className="flex gap-2">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="Add technology"
              className="flex-1 px-4 py-2 bg-white/10 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
            />
            <button
              type="button"
              onClick={handleAddTech}
              className="px-4 py-2 bg-blue-500 rounded-lg font-semibold"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {newProject.technologies.map((tech, idx) => (
              <span key={idx} className="px-3 py-1 bg-purple-500/30 border border-purple-500 rounded-full text-sm flex items-center gap-2">
                {tech}
                <button type="button" onClick={() => handleRemoveTech(idx)} className="text-red-400">×</button>
              </span>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="url"
              value={newProject.liveLink}
              onChange={(e) => setNewProject({ ...newProject, liveLink: e.target.value })}
              placeholder="Live Link"
              className="px-4 py-2 bg-white/10 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
            />
            <input
              type="url"
              value={newProject.githubLink}
              onChange={(e) => setNewProject({ ...newProject, githubLink: e.target.value })}
              placeholder="GitHub Link"
              className="px-4 py-2 bg-white/10 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 font-bold rounded-lg disabled:opacity-50"
          >
            {loading ? 'Adding...' : '✅ Add Project'}
          </motion.button>
        </motion.form>
      )}

      <div className="grid gap-6">
        {projects.map((project) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 bg-white/5 border border-purple-500/20 rounded-lg hover:bg-white/10 transition"
          >
            {project.image && (
              <img src={project.image} alt={project.title} className="w-full h-40 object-cover rounded-lg mb-4" />
            )}
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-gray-300 mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies?.map((tech, idx) => (
                <span key={idx} className="px-3 py-1 bg-blue-500/30 border border-blue-500 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                  🔗 Live
                </a>
              )}
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300">
                  💻 GitHub
                </a>
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => handleDeleteProject(project._id)}
                className="ml-auto px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg hover:bg-red-500/30 transition"
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Experience Section Component
const ExperienceSection = ({ onUpdate }) => {
  const [experiences, setExperiences] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newExperience, setNewExperience] = useState({
    company: '',
    role: '',
    description: '',
    startDate: '',
    endDate: '',
    currentlyWorking: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const { data } = await experienceAPI.getExperiences();
      setExperiences(data);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    }
  };

  const handleAddExperience = async (e) => {
    e.preventDefault();
    if (!newExperience.company.trim() || !newExperience.role.trim() || !newExperience.startDate) return;

    setLoading(true);
    try {
      await experienceAPI.addExperience(newExperience);
      setNewExperience({ company: '', role: '', description: '', startDate: '', endDate: '', currentlyWorking: false });
      setShowForm(false);
      fetchExperiences();
      onUpdate();
    } catch (error) {
      console.error('Error adding experience:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExperience = async (id) => {
    try {
      await experienceAPI.deleteExperience(id);
      fetchExperiences();
      onUpdate();
    } catch (error) {
      console.error('Error deleting experience:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">🏢 Experience</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold"
        >
          {showForm ? 'Cancel' : '+ Add Experience'}
        </motion.button>
      </div>

      {showForm && (
        <motion.form
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleAddExperience}
          className="mb-8 p-6 bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-lg space-y-4"
        >
          <input
            type="text"
            value={newExperience.company}
            onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
            placeholder="Company name"
            className="w-full px-4 py-2 bg-white/10 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
          />
          <input
            type="text"
            value={newExperience.role}
            onChange={(e) => setNewExperience({ ...newExperience, role: e.target.value })}
            placeholder="Job role"
            className="w-full px-4 py-2 bg-white/10 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
          />
          <textarea
            value={newExperience.description}
            onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
            placeholder="Job description"
            rows="3"
            className="w-full px-4 py-2 bg-white/10 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              value={newExperience.startDate}
              onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
              className="px-4 py-2 bg-white/10 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
            />
            <input
              type="date"
              value={newExperience.endDate}
              onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
              disabled={newExperience.currentlyWorking}
              className="px-4 py-2 bg-white/10 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500 disabled:opacity-50"
            />
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={newExperience.currentlyWorking}
              onChange={(e) => setNewExperience({ ...newExperience, currentlyWorking: e.target.checked })}
              className="w-4 h-4"
            />
            <span>Currently working here</span>
          </label>
          <motion.button
            whileHover={{ scale: 1.02 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 font-bold rounded-lg disabled:opacity-50"
          >
            {loading ? 'Adding...' : '✅ Add Experience'}
          </motion.button>
        </motion.form>
      )}

      <div className="space-y-4">
        {experiences.map((exp) => (
          <motion.div
            key={exp._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 bg-white/5 border border-purple-500/20 rounded-lg hover:bg-white/10 transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                <p className="text-purple-400 font-semibold mb-2">{exp.company}</p>
                {exp.description && <p className="text-gray-300 mb-2">{exp.description}</p>}
                <p className="text-sm text-gray-400">
                  {new Date(exp.startDate).toLocaleDateString()} - {exp.currentlyWorking ? 'Present' : new Date(exp.endDate).toLocaleDateString()}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => handleDeleteExperience(exp._id)}
                className="px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg hover:bg-red-500/30 transition"
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Portfolio Preview Component
const PortfolioPreview = ({ user }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl"
    >
      <h2 className="text-3xl font-bold mb-8">👁️ Portfolio Preview</h2>
      <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-lg p-8">
        <div className="text-center mb-8">
          {user?.profileImage && (
            <img src={user.profileImage} alt={user.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-purple-500" />
          )}
          <h1 className="text-4xl font-bold mb-2">{user?.name}</h1>
          <p className="text-xl text-purple-400 mb-2">{user?.title}</p>
          {user?.location && <p className="text-gray-400 mb-4">📍 {user.location}</p>}
          {user?.bio && <p className="text-gray-300 max-w-2xl mx-auto">{user.bio}</p>}
        </div>
      </div>
    </motion.div>
  );
};

// Share Portfolio Component
const SharePortfolio = ({ user }) => {
  const portfolioLink = `${window.location.origin}/portfolio/${user?.portfolioUrl}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(portfolioLink);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl"
    >
      <h2 className="text-3xl font-bold mb-8">🔗 Share Your Portfolio</h2>
      <div className="p-8 bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-lg">
        <p className="text-gray-300 mb-4">Your unique portfolio link:</p>
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            value={portfolioLink}
            readOnly
            className="flex-1 px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-purple-500"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={copyToClipboard}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold"
          >
            📋 Copy
          </motion.button>
        </div>
        <motion.a
          href={portfolioLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          className="block px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg font-semibold text-center"
        >
          👁️ Open Portfolio
        </motion.a>
      </div>
    </motion.div>
  );
};

export default Dashboard;
