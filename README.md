# Engineer Lab

An interactive platform built with React and TypeScript for visualizing engineering concepts and data structures.

**Live Demo**: [engineerlab.rennan.tech](https://engineerlab.rennan.tech)

## Features

- **Interactive Visualizations**: See how engineering concepts work in real-time
- **Educational Demonstrations**:
  - Data structures (HashMap, arrays, trees, etc.)
  - Algorithm visualizations
  - Engineering concept simulations
- **Modern Interface**: Responsive and intuitive design
- **Comparative Analysis**: Visualize different implementations and approaches
- **Playback Controls**: Play, pause, step-by-step navigation

## Tech Stack

### Core Technologies

- **React 19.1.0** - Modern user interface library with latest features
- **TypeScript 5.8.3** - Static typing for enhanced development experience
- **Vite 6.3.5** - Next-generation build tool and dev server
- **CSS3** - Modern styling with advanced features

### Development Tools

- **ESLint 9.25.0** - Code quality and linting
- **TypeScript ESLint 8.30.1** - TypeScript-specific linting rules
- **React Hooks ESLint Plugin** - React hooks best practices
- **React Refresh ESLint Plugin** - Fast refresh support

### Build Configuration

- **ES2020/ES2022** - Modern JavaScript features
- **JSX React Transform** - Optimized JSX compilation
- **Bundler Module Resolution** - Advanced module resolution
- **Strict TypeScript** - Enhanced type checking

### Deployment & Infrastructure

- **Docker** - Containerization for consistent deployments
- **Docker Compose** - Multi-container orchestration
- **Nginx** - High-performance web server and reverse proxy
- **GitHub Actions** - Automated CI/CD pipeline
- **Let's Encrypt** - Automated SSL certificate management

## Installation

```bash
# Clone the repository
git clone https://github.com/rennanribas/engineer-lab
cd engineer-lab

# Install dependencies
npm install

# Run development server
npm run dev
```

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run ESLint for code quality
npm run lint

# Preview production build locally
npm run preview
```

## Deployment

### EC2 Setup

1. Launch an EC2 instance (Amazon Linux 2023, t2.micro for free tier)
2. Configure GitHub Secrets:
   - `EC2_HOST`: Your EC2 public IP
   - `EC2_USER`: ec2-user
   - `EC2_SSH_KEY`: Your private SSH key
   - `DOMAIN_NAME`: Your domain (optional)
   - `SSL_EMAIL`: Your email for SSL certificates

3. Push to main branch to trigger automated deployment

The GitHub Actions workflow will automatically:
- Install Docker and Docker Compose
- Configure firewall settings
- Clone/update the repository
- Generate SSL certificates (Let's Encrypt or self-signed)
- Build and deploy the application

### Local Development

```bash
docker-compose up --build
```

## Contributing

Contributions are welcome! Feel free to:

1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Educational Purpose

This project was developed with an educational focus to help students and developers better understand the internal workings through interactive visualizations and practical demonstrations.

## Author

**Rennan Ribas**

- Website: [engineerlab.rennan.tech](https://engineerlab.rennan.tech)
- GitHub: [rennanribas](https://github.com/rennanribas)
- Project Repository: [Engineer Lab](https://github.com/rennanribas/engineer-lab)

---
