import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { resumeData } from "@/data/resumeData";

export default function Certificates() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.section 
      id="certificates" 
      className="py-16 bg-white dark:bg-card transition-colors duration-300"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-heading">Certificates</h2>
          <div className="section-divider"></div>
          <p className="section-description">
            Professional certifications that validate my skills and expertise.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumeData.certificates.map((certificate, index) => (
            <motion.div 
              key={index} 
              className="bg-background dark:bg-background rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-5 flex flex-col"
              variants={itemVariants}
            >
              <div className="flex items-start mb-4">
                <Award className="text-primary dark:text-primary text-3xl mr-3" />
                <h3 className="text-lg font-semibold">{certificate.name}</h3>
              </div>
              <div className="flex-grow"></div>
              <a 
                href={certificate.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary dark:text-primary hover:underline mt-3 inline-flex items-center self-end"
              >
                View Certificate
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
