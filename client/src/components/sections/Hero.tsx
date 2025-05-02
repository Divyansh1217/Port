import { motion } from "framer-motion";
import { Mail, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiKaggle } from "react-icons/si";
import { MdEmail, MdPhone } from "react-icons/md";
import profileImage from "@assets/mypic.jpg";

export default function Hero() {
  const handleDownloadCV = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    // In a real application, this would trigger a download of the CV file
    alert("CV download would be triggered here");
  };

  return (
    <section id="home" className="min-h-screen pt-24 pb-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Hero Text */}
          <motion.div 
            className="order-2 md:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-poppins leading-tight mb-4">
              <span className="block">Hello, I'm</span>
              <span className="text-primary dark:text-primary">Divyansh Aggarwal</span>
            </h1>
            <h2 className="text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-300 mb-6">
              Data Science & AI Specialist
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
              Leveraging advanced analytics and machine learning expertise to solve complex problems and drive business success.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button asChild className="px-6 py-3 bg-primary hover:bg-primary/80 text-white font-medium">
                <a href="#contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Me
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                asChild
                className="px-6 py-3 bg-white dark:bg-card hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium border border-gray-300 dark:border-gray-700"
              >
                <a href="#" onClick={handleDownloadCV}>
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </a>
              </Button>
            </div>
            
            {/* Social Links */}
            <div className="mt-8 flex items-center space-x-4">
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
              <a 
                href="mailto:divyansh27aggarwal@gmail.com" 
                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors" 
                aria-label="Email"
              >
                <MdEmail className="h-6 w-6" />
              </a>
              <a 
                href="tel:+918920942832" 
                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors" 
                aria-label="Phone"
              >
                <MdPhone className="h-6 w-6" />
              </a>
            </div>
          </motion.div>
          
          {/* Hero Image */}
          <motion.div 
            className="order-1 md:order-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary dark:border-primary shadow-xl bg-gray-200 dark:bg-gray-700">
              <img 
                src={profileImage}
                alt="Divyansh Aggarwal" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
