import { Navigation } from '../Navigation/Navigation';
import { useNavigation } from '../../contexts/useNavigation';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const { currentPage } = useNavigation();
  const showPageHeader = currentPage === 'visualizer' && (title || subtitle);

  return (
    <>
      <Navigation />
      {showPageHeader && (
        <header className="page-header">
          <div className="page-header-content">
            {title && <h1 className="page-header-title">{title}</h1>}
            {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
          </div>
        </header>
      )}
    </>
  );
};