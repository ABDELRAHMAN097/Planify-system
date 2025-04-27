import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: {
        duration: 0.8,
        ease: "easeOut",
      } 
    },
  };

  return (
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={containerVariants}
      className="bg-gray-900 text-gray-300 pt-12 pb-6"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Content */}
        <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo and Description */}
          <motion.div variants={childVariants}>
            <h3 className="text-2xl font-bold text-white mb-4">Planify</h3>
            <p className="text-gray-400">
              The ultimate solution for task management and effective collaboration.
            </p>
          </motion.div>

          {/* Company Links */}
          <motion.div variants={childVariants}>
            <h4 className="text-xl font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Contact</a></li>
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div variants={childVariants}>
            <h4 className="text-xl font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Support</a></li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={childVariants}>
            <h4 className="text-xl font-semibold text-white mb-4">Contact</h4>
            <p className="text-gray-400 mb-2">Email: support@planify.com</p>
            <p className="text-gray-400">Phone: +966 123 456 789</p>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} Planify. Developed by{" "}
            <a
              href="https://github.com/ABDELRAHMAN097"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline"
            >
              Abdelrahman Magdy
            </a>.
          </p>

          {/* Social Icons */}
          <motion.div 
            className="flex space-x-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {[
              { icon: <FaFacebookF />, link: "#" },
              { icon: <FaTwitter />, link: "#" },
              { icon: <FaLinkedinIn />, link: "#" },
              { icon: <FaInstagram />, link: "#" },
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: "#6366F1" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-gray-400 hover:text-indigo-400 transition-colors"
              >
                {item.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

      </div>
    </motion.footer>
  );
};

export default Footer;
