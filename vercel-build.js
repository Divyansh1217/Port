// This is a custom build script for Vercel deployment
const { execSync } = require('child_process');

// Run the build commands
try {
  console.log('Building the client...');
  execSync('vite build', { stdio: 'inherit' });
  
  console.log('Building the server...');
  execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}