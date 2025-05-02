import { motion } from "framer-motion";
import { MdWork } from "react-icons/md";
import { resumeData } from "@/data/resumeData";

export default function Experience() {
  return (
    <motion.section 
      id="experience" 
      className="py-16 bg-white dark:bg-card transition-colors duration-300"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-heading">Professional Experience</h2>
          <div className="section-divider"></div>
          <p className="section-description">
            My professional journey and experiences in the field of data science and AI.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
          
          {/* Timeline Items */}
          <div className="space-y-12">
            {resumeData.experience.map((exp, index) => (
              <motion.div 
                key={index} 
                className={`relative flex flex-col md:flex-row items-center`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {index % 2 === 0 ? (
                  <>
                    <div className="flex-1 md:text-right md:pr-8 pb-8 md:pb-0">
                      <div className="bg-background dark:bg-background p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h3 className="text-xl font-semibold font-poppins text-primary dark:text-primary">{exp.company}</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-3">{exp.period}</p>
                        <p className="text-lg font-medium mb-2">{exp.title}</p>
                        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                          {exp.responsibilities.map((resp, i) => (
                            <li key={i}>{resp}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="md:mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary dark:bg-primary text-white shadow-lg z-10">
                      <MdWork />
                    </div>
                    
                    <div className="flex-1 md:pl-8 hidden md:block"></div>
                  </>
                ) : (
                  <>
                    <div className="flex-1 md:text-right md:pr-8 hidden md:block"></div>
                    
                    <div className="md:mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary dark:bg-primary text-white shadow-lg z-10">
                      <MdWork />
                    </div>
                    
                    <div className="flex-1 md:pl-8 pb-8 md:pb-0">
                      <div className="bg-background dark:bg-background p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h3 className="text-xl font-semibold font-poppins text-primary dark:text-primary">{exp.company}</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-3">{exp.period}</p>
                        <p className="text-lg font-medium mb-2">{exp.title}</p>
                        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                          {exp.responsibilities.map((resp, i) => (
                            <li key={i}>{resp}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
