import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon, title, description, delay = 0 }) => {
  return (
    <motion.div 
      className="bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-lg border border-secondary-100 dark:border-secondary-700 hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mr-3">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-secondary-800 dark:text-secondary-200">{title}</h3>
      </div>
      <p className="text-secondary-600 dark:text-secondary-400">{description}</p>
    </motion.div>
  );
};

const AboutPage = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-block mb-4"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary-600 to-accent-500 flex items-center justify-center text-white">
            <img src="/logo.svg" alt="Logo" className="h-12 w-12" />
          </div>
        </motion.div>
        <h1 className="text-4xl font-bold text-secondary-800 dark:text-white mb-4">Welcome to TUTAM SBD9 Ifan</h1>
        <p className="text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto text-lg">
          A comprehensive task and note management application built with modern web technologies.
          Featuring an intuitive UI with dark mode support, responsive design, and smooth animations.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link to="/tasks" className="bg-primary-600 hover:bg-primary-700 text-white py-2.5 px-6 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg">
            Start Managing Tasks
          </Link>          <Link to="/notes" className="bg-secondary-200 dark:bg-secondary-700 hover:bg-secondary-300 dark:hover:bg-secondary-600 text-secondary-800 dark:text-secondary-100 py-2.5 px-6 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg">
            Organize Your Notes
          </Link>
        </div>
      </motion.div>
      
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <FeatureCard 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          }
          title="Frontend Technologies"
          description="Built with React.js, React Router for navigation, and styled with TailwindCSS. Features smooth animations with Framer Motion and light/dark mode support."
          delay={0.1}
        />
        
        <FeatureCard 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
          }
          title="Backend & Database"
          description="Powered by Express.js with a RESTful API design. Data is stored in a PostgreSQL database with efficient queries for fast task management."
          delay={0.2}
        />
        
        <FeatureCard
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          }
          title="Features"
          description="Create, read, update and delete tasks. Mark tasks as completed, organize your day, and enjoy a beautiful user interface that adapts to your preference."
          delay={0.3}
        />
        
        <FeatureCard
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          }
          title="Customization"
          description="Enjoy a fully responsive design that works on all devices. Switch between light and dark mode to match your preference and reduce eye strain."
          delay={0.4}
        />
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center py-6 px-4 rounded-xl bg-gradient-to-r from-primary-600/10 to-accent-500/10 dark:from-primary-900/20 dark:to-accent-900/20"
      >
        <p className="text-secondary-700 dark:text-secondary-300">
          This project was created as part of TUTAM9 assignment, focusing on web development with modern technologies.
        </p>
      </motion.div>
    </div>
  );
};

export default AboutPage;
