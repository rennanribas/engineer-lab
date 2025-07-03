
import { PipelineDiagram } from '../components/Infrastructure/PipelineDiagram';

export function Infrastructure() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Infrastructure & Deployment Pipeline
      </h1>
      <p className="text-lg text-center mb-12">
        A visual overview of the CI/CD pipeline for the 'infra-rennan-tech' project, from code commit to live deployment.
      </p>
      <PipelineDiagram />
    </div>
  );
}
