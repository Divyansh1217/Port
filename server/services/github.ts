import { apiRequest } from "@/lib/queryClient";

// Sample projects data as fallback for when GitHub API rate limit is reached
const fallbackProjects = [
  {
    id: 1,
    name: "AI-Powered Chatbot",
    html_url: "https://github.com/Divyansh1217/ai-chatbot",
    description: "A sophisticated chatbot using natural language processing for customer support automation.",
    language: "Python",
    technologies: ["Python", "TensorFlow", "NLTK", "Flask"],
    fork: false
  },
  {
    id: 2,
    name: "Data Analytics Dashboard",
    html_url: "https://github.com/Divyansh1217/analytics-dashboard",
    description: "Interactive dashboard for visualizing complex datasets with filtering capabilities.",
    language: "JavaScript",
    technologies: ["React", "D3.js", "Node.js", "Express"],
    fork: false
  },
  {
    id: 3,
    name: "Image Classification System",
    html_url: "https://github.com/Divyansh1217/image-classifier",
    description: "Deep learning based image classification model with high accuracy rates.",
    language: "Python",
    technologies: ["Python", "PyTorch", "OpenCV", "NumPy"],
    fork: false
  },
  {
    id: 4,
    name: "Sentiment Analysis Dashboard",
    html_url: "https://github.com/Divyansh1217/sentiment-analysis",
    description: "Real-time sentiment analysis tool for social media monitoring and brand perception.",
    language: "Python",
    technologies: ["Python", "BERT", "React", "FastAPI"],
    fork: false
  }
];

// Function to fetch user repositories from GitHub API
export async function fetchUserRepositories(username: string) {
  try {
    // Check if GitHub token is available
    const headers: HeadersInit = {};
    const githubToken = process.env.GITHUB_TOKEN;
    
    if (githubToken) {
      headers.Authorization = `token ${githubToken}`;
    }
    
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=10`,
      { headers }
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.warn(`GitHub API error: ${errorData.message}`);
      
      if (response.status === 403 && response.headers.get('x-ratelimit-remaining') === '0') {
        console.warn('GitHub API rate limit exceeded, using fallback data');
        return fallbackProjects;
      }
      
      throw new Error(errorData.message || `Failed to fetch repositories: ${response.statusText}`);
    }
    
    const repositories = await response.json();
    
    // Add technologies for repositories by analyzing languages used
    // Limit concurrent requests to avoid rate limiting
    const reposWithLanguages = [];
    
    for (const repo of repositories) {
      if (!repo.fork) { // Filter out forked repositories
        let repoWithTech = { ...repo };
        
        if (repo.languages_url) {
          try {
            const languageHeaders = { ...headers };
            const languagesResponse = await fetch(repo.languages_url, { headers: languageHeaders });
            
            if (languagesResponse.ok) {
              const languages = await languagesResponse.json();
              repoWithTech.technologies = Object.keys(languages);
            } else {
              repoWithTech.technologies = [repo.language].filter(Boolean);
            }
          } catch (error) {
            console.error(`Error fetching languages for ${repo.name}:`, error);
            repoWithTech.technologies = [repo.language].filter(Boolean);
          }
        } else {
          repoWithTech.technologies = [repo.language].filter(Boolean);
        }
        
        reposWithLanguages.push(repoWithTech);
      }
    }
    
    return reposWithLanguages.length > 0 ? reposWithLanguages : fallbackProjects;
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error);
    return fallbackProjects;
  }
}
