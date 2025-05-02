import { motion } from "framer-motion";
import { MdLocationOn, MdPhone, MdEmail, MdPsychology, MdLanguage, MdInsights, MdPublic } from "react-icons/md";
import { resumeData } from "@/data/resumeData";

export default function About() {
  return (
    <motion.section 
      id="about" 
      className="py-16 bg-white dark:bg-card transition-colors duration-300"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-heading">About Me</h2>
          <div className="section-divider"></div>
          <p className="section-description">
            Data science and Artificial Intelligence enthusiast with a passion for leveraging technology to solve real-world problems.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-background dark:bg-background rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              {resumeData.objective}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold font-poppins mb-4 text-primary dark:text-primary">Personal Information</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <MdLocationOn className="text-primary dark:text-primary text-xl mr-3 mt-0.5" />
                    <span>{resumeData.location}</span>
                  </li>
                  <li className="flex items-start">
                    <MdPhone className="text-primary dark:text-primary text-xl mr-3 mt-0.5" />
                    <span>{resumeData.phone}</span>
                  </li>
                  <li className="flex items-start">
                    <MdEmail className="text-primary dark:text-primary text-xl mr-3 mt-0.5" />
                    <span>{resumeData.email}</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold font-poppins mb-4 text-primary dark:text-primary">Interests & Focus Areas</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <MdPsychology className="text-primary dark:text-primary text-xl mr-3 mt-0.5" />
                    <span>Machine Learning & Deep Learning</span>
                  </li>
                  <li className="flex items-start">
                    <MdLanguage className="text-primary dark:text-primary text-xl mr-3 mt-0.5" />
                    <span>Natural Language Processing</span>
                  </li>
                  <li className="flex items-start">
                    <MdInsights className="text-primary dark:text-primary text-xl mr-3 mt-0.5" />
                    <span>Data Analytics & Visualization</span>
                  </li>
                  <li className="flex items-start">
                    <MdPublic className="text-primary dark:text-primary text-xl mr-3 mt-0.5" />
                    <span>LLMs & Transformers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
