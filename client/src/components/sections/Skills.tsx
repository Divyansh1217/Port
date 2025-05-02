import { motion } from "framer-motion";
import { MdCode, MdBuild, MdCheckCircle, MdPsychology } from "react-icons/md";
import { resumeData } from "@/data/resumeData";

export default function Skills() {
  // Technical skills with percentage
  const technicalSkills = [
    { name: "Python", percentage: 90 },
    { name: "Machine Learning", percentage: 85 },
    { name: "Deep Learning", percentage: 80 },
    { name: "NLP", percentage: 75 },
    { name: "SQL", percentage: 70 }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.section 
      id="skills" 
      className="py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-heading">Skills & Abilities</h2>
          <div className="section-divider"></div>
          <p className="section-description">
            My technical expertise and soft skills that I bring to the table.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Technical Skills */}
          <motion.div 
            className="bg-white dark:bg-card rounded-xl shadow-md overflow-hidden card-hover"
            variants={cardVariants}
          >
            <div className="p-6">
              <div className="flex items-center mb-6">
                <MdCode className="text-3xl text-primary dark:text-primary mr-3" />
                <h3 className="text-xl font-semibold font-poppins">Technical Skills</h3>
              </div>
              
              <div className="space-y-4">
                {technicalSkills.map((skill) => (
                  <div key={skill.name} className="skill-item">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span>{skill.percentage}%</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress" 
                        style={{ width: `${skill.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Tools & Frameworks */}
          <motion.div 
            className="bg-white dark:bg-card rounded-xl shadow-md overflow-hidden card-hover"
            variants={cardVariants}
          >
            <div className="p-6">
              <div className="flex items-center mb-6">
                <MdBuild className="text-3xl text-secondary dark:text-secondary mr-3" />
                <h3 className="text-xl font-semibold font-poppins">Tools & Frameworks</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {resumeData.tools.map((tool, index) => (
                  <div key={index} className="flex items-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <span className="w-3 h-3 rounded-full bg-secondary mr-2"></span>
                    <span>{tool}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Soft Skills */}
          <motion.div 
            className="bg-white dark:bg-card rounded-xl shadow-md overflow-hidden card-hover"
            variants={cardVariants}
          >
            <div className="p-6">
              <div className="flex items-center mb-6">
                <MdPsychology className="text-3xl text-accent dark:text-accent mr-3" />
                <h3 className="text-xl font-semibold font-poppins">Soft Skills</h3>
              </div>
              
              <div className="space-y-4">
                {resumeData.softSkills.map((skill, index) => (
                  <div key={index} className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center space-x-3">
                    <MdCheckCircle className="text-accent dark:text-accent" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
