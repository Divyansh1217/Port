import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Code, ArrowRight } from "lucide-react";
import { useGitHubProjects } from "@/hooks/useGitHubProjects";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { resumeData } from "@/data/resumeData";

export default function Projects() {
  const { projects, isLoading, error } = useGitHubProjects();
  const [displayedProjects, setDisplayedProjects] = useState<any[]>([]);

  useEffect(() => {
    if (projects && projects.length > 0) {
      setDisplayedProjects(projects.slice(0, 3));
    } else if (!isLoading && !error) {
      // Fallback to static data if API fails but no error is detected
      setDisplayedProjects(resumeData.projects);
    }
  }, [projects, isLoading, error]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <section id="projects" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-heading">Projects</h2>
          <div className="section-divider"></div>
          <p className="section-description">
            Explore some of my recent projects that demonstrate my technical skills and problem-solving abilities.
          </p>
        </div>
        
        {isLoading ? (
          // Loading state
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-card rounded-xl shadow-lg overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-20 w-full" />
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                  <Skeleton className="h-8 w-32" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          // Error state
          <div className="text-center text-red-500 dark:text-red-400">
            <p>Failed to load projects. Displaying static projects data.</p>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {resumeData.projects.map((project, index) => (
                <ProjectCard key={index} project={project} variant={itemVariants} />
              ))}
            </motion.div>
          </div>
        ) : (
          // Success state
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {displayedProjects.map((project, index) => (
              <ProjectCard key={index} project={project} variant={itemVariants} />
            ))}
          </motion.div>
        )}
        
        <div className="text-center mt-10">
          <Button asChild className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/80 text-white font-medium">
            <a href="https://github.com/Divyansh1217" target="_blank" rel="noopener noreferrer">
              <Code className="mr-2 h-4 w-4" />
              View All Projects on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: any;
  variant: any;
}

function ProjectCard({ project, variant }: ProjectCardProps) {
  // Generate a gradient based on the project name to have different images for projects
  const getProjectImageUrl = (name: string) => {
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return `https://source.unsplash.com/500x300/?tech,${hash % 10}`;
  };
  
  const imageUrl = project.image || getProjectImageUrl(project.name);
  
  return (
    <motion.div 
      className="bg-white dark:bg-card rounded-xl shadow-lg overflow-hidden card-hover"
      variants={variant}
    >
      <div className="h-48 bg-gray-300 dark:bg-gray-700 relative overflow-hidden">
        <img 
          src={imageUrl}
          alt={project.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <h3 className="absolute bottom-3 left-4 text-white text-xl font-semibold font-poppins">{project.name}</h3>
      </div>
      
      <div className="p-6">
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {project.description || "No description available."}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies && project.technologies.map((tech: string, i: number) => (
            <span key={i} className="technology-badge">{tech}</span>
          ))}
          {!project.technologies && project.language && (
            <span className="technology-badge">{project.language}</span>
          )}
        </div>
        
        <a 
          href={project.url || project.html_url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center text-primary dark:text-primary hover:underline font-medium"
        >
          <Code className="mr-1 h-4 w-4" />
          View on GitHub
          <ArrowRight className="ml-1 h-4 w-4" />
        </a>
      </div>
    </motion.div>
  );
}
