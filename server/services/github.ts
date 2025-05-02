import { apiRequest } from "@/lib/queryClient";

// Function to fetch user repositories from GitHub API
export async function fetchUserRepositories(username: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to fetch repositories: ${response.statusText}`);
    }
    
    const repositories = await response.json();
    
    // Add technologies for repositories by analyzing languages used
    for (const repo of repositories) {
      if (repo.languages_url) {
        try {
          const languagesResponse = await fetch(repo.languages_url);
          if (languagesResponse.ok) {
            const languages = await languagesResponse.json();
            repo.technologies = Object.keys(languages);
          }
        } catch (error) {
          console.error(`Error fetching languages for ${repo.name}:`, error);
          // Continue even if we can't fetch languages for a repository
        }
      }
    }
    
    return repositories;
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error);
    throw error;
  }
}
