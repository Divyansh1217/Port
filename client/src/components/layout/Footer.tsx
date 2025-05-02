import { Link } from "wouter";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiKaggle } from "react-icons/si";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-card py-8 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold font-poppins text-primary dark:text-primary mb-4">
            Divyansh Aggarwal
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Data Science & AI Specialist
          </p>
          
          <div className="flex justify-center space-x-6 mb-8">
            <a
              href="https://www.linkedin.com/in/divyansh279/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-6 w-6" />
            </a>
            <a
              href="https://github.com/Divyansh1217"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <FaGithub className="h-6 w-6" />
            </a>
            <a
              href="https://www.kaggle.com/divyanshagg27"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              aria-label="Kaggle"
            >
              <SiKaggle className="h-6 w-6" />
            </a>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              &copy; {currentYear} Divyansh Aggarwal. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
