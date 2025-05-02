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
  });
  
  const [projects, setProjects] = useState<Project[]>([]);
  
  useEffect(() => {
    if (data) {
      // Filter out forked repositories and format the projects
      const filteredProjects = data
        .filter(repo => !repo.fork)
        .slice(0, 3)
        .map(repo => ({
          ...repo,
          technologies: repo.language ? [repo.language] : []
        }));
      
      setProjects(filteredProjects);
    }
  }, [data]);
  
  return {
    projects,
    isLoading,
    error
  };
}
