import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

interface Project {
  id: number;
  name: string;
  html_url: string;
  description: string;
  language: string;
  technologies?: string[];
  fork: boolean;
}

export function useGitHubProjects() {
  const username = "Divyansh1217";
  
  const { data, isLoading, error } = useQuery<Project[]>({
    queryKey: [`/api/github/${username}/repos`],
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 2,
    refetchOnWindowFocus: false,
  });
  
  const [projects, setProjects] = useState<Project[]>([]);
  
  useEffect(() => {
    if (data) {
      // Format and prepare the projects for display
      const formattedProjects = data
        .slice(0, 6) // Show up to 6 projects
        .map(repo => ({
          ...repo,
          // Use the technologies array if it exists, otherwise use the language
          technologies: repo.technologies && repo.technologies.length > 0 
            ? repo.technologies 
            : repo.language 
              ? [repo.language] 
              : []
        }));
      
      setProjects(formattedProjects);
    }
  }, [data]);
  
  return {
    projects,
    isLoading,
    error
  };
}
