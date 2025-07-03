
import React, { useState } from 'react';
import { Card } from './Card';

const pipelineStages = [
  {
    title: 'GitHub Repository',
    description: 'Code is pushed to the main branch, triggering the CI/CD pipeline.',
  },
  {
    title: 'GitHub Actions',
    description: 'A workflow is initiated to build, test, and package the application.',
  },
  {
    title: 'Docker Build & Push',
    description: 'The application is containerized into a Docker image and pushed to AWS ECR.',
  },
  {
    title: 'AWS ECR',
    description: 'The Docker image is stored in a private Elastic Container Registry.',
  },
  {
    title: 'AWS ECS',
    description: 'A new task definition is created, and the service is updated to deploy the new image.',
  },
  {
    title: 'Live Site',
    description: 'The updated container is deployed, and the changes are live.',
  },
];

export function PipelineDiagram() {
  const [currentStage, setCurrentStage] = useState(0);

  const handleNext = () => {
    setCurrentStage((prev) => (prev < pipelineStages.length - 1 ? prev + 1 : prev));
  };

  const handlePrevious = () => {
    setCurrentStage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <div className="pipeline-container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pipelineStages.map((stage, index) => (
          <Card
            key={index}
            title={stage.title}
            description={stage.description}
            isActive={index === currentStage}
          />
        ))}
      </div>
      <div className="flex justify-center mt-8 space-x-4">
        <button onClick={handlePrevious} disabled={currentStage === 0} className="control-button">
          Previous
        </button>
        <button onClick={handleNext} disabled={currentStage === pipelineStages.length - 1} className="control-button">
          Next
        </button>
      </div>
    </div>
  );
}
