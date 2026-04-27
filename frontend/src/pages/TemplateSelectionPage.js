import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { templateAPI, profileAPI } from '../api/services';
import { useAuth } from '../context/AuthContext';
import { FaCheck } from 'react-icons/fa';

const TemplateSelectionPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data } = await templateAPI.getTemplates();
      setTemplates(data);
      setSelectedTemplate(data[0]?._id);
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  const handleSelectTemplate = async () => {
    if (!selectedTemplate) return;

    setLoading(true);
    try {
      await profileAPI.selectTemplate(selectedTemplate);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error selecting template:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Choose Your Template</h1>
          <p className="text-gray-400 text-lg">Select a beautiful template to start building your portfolio</p>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {templates.map((template) => (
            <motion.div
              key={template._id}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedTemplate(template._id)}
              className={`cursor-pointer rounded-xl overflow-hidden border-2 transition ${
                selectedTemplate === template._id
                  ? 'border-purple-500 shadow-2xl shadow-purple-500/50'
                  : 'border-purple-500/30 hover:border-purple-500/50'
              }`}
            >
              {/* Template Preview */}
              <div className={`h-64 bg-gradient-to-br ${template.color || 'from-blue-500 to-purple-600'} flex items-center justify-center relative`}>
                <div className="text-center text-white z-10">
                  <h2 className="text-3xl font-bold mb-2">{template.name}</h2>
                  <p className="text-white/80">{template.description || 'Professional & Modern'}</p>
                </div>
              </div>

              {/* Selection Indicator */}
              {selectedTemplate === template._id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 bg-green-500 rounded-full p-2"
                >
                  <FaCheck className="text-white" />
                </motion.div>
              )}

              {/* Features */}
              <div className="p-6 bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-xl">
                <h3 className="text-xl font-bold text-white mb-3">{template.name}</h3>
                <ul className="space-y-2 text-gray-300">
                  {(template.features || ['Responsive Design', 'Fast Loading', 'SEO Optimized']).map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <FaCheck className="text-green-400" /> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Button */}
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSelectTemplate}
            disabled={loading || !selectedTemplate}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 transition"
          >
            {loading ? 'Selecting...' : '✨ Confirm & Continue'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default TemplateSelectionPage;
