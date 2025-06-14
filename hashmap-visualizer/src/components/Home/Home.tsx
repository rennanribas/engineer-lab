import { useNavigation } from '../../contexts/useNavigation'

export const Home = () => {
  const { setCurrentPage } = useNavigation()

  const handleExploreClick = () => {
    setCurrentPage('visualizer')
  }

  return (
    <div className='home'>
      <section className='hero'>
        <div className='hero-container'>
          <div className='hero-content'>
            <h1 className='hero-title'>
              Software Engineering
              <br />
              Concepts
            </h1>
            <p className='hero-subtitle'>
              Interactive demonstrations of fundamental computer science
              concepts and data structures through modern web technologies
            </p>
            <div className='hero-actions'>
              <button
                onClick={handleExploreClick}
                className='cta-button cta-button--primary'
              >
                Explore Data Structures
              </button>
              <button
                onClick={() => setCurrentPage('eventloop')}
                className='cta-button cta-button--primary'
              >
                Explore Event Loop
              </button>
              <a
                href='https://github.com/rennanribas'
                target='_blank'
                rel='noopener noreferrer'
                className='cta-button cta-button--secondary'
              >
                View on GitHub
              </a>
            </div>
          </div>
          <div className='hero-visual'>
            <div className='code-preview'>
              <div className='code-header'>
                <div className='code-dots'>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className='code-title'>HashMap.ts</span>
              </div>
              <div className='code-content'>
                <div className='code-line'>
                  <span className='code-keyword'>class</span>
                  <span className='code-class'>HashMap</span>
                  <span className='code-operator'>&lt;</span>
                  <span className='code-type'>K, V</span>
                  <span className='code-operator'>&gt;</span>
                  <span className='code-bracket'>{'{'}</span>
                </div>
                <div className='code-line code-line--indent'>
                  <span className='code-keyword'>private</span>
                  <span className='code-property'>buckets</span>
                  <span className='code-operator'>:</span>
                  <span className='code-type'>Array</span>
                  <span className='code-operator'>&lt;</span>
                  <span className='code-type'>Entry</span>
                  <span className='code-operator'>&lt;</span>
                  <span className='code-type'>K, V</span>
                  <span className='code-operator'>&gt;</span>
                  <span className='code-operator'>[]&gt;</span>
                </div>
                <div className='code-line code-line--indent'>
                  <span className='code-keyword'>public</span>
                  <span className='code-method'>set</span>
                  <span className='code-bracket'>(</span>
                  <span className='code-param'>key</span>
                  <span className='code-operator'>:</span>
                  <span className='code-type'>K</span>
                  <span className='code-operator'>,</span>
                  <span className='code-param'>value</span>
                  <span className='code-operator'>:</span>
                  <span className='code-type'>V</span>
                  <span className='code-bracket'>)</span>
                  <span className='code-bracket'>{'{'}</span>
                </div>
                <div className='code-line code-line--indent-2'>
                  <span className='code-keyword'>const</span>
                  <span className='code-variable'>index</span>
                  <span className='code-operator'>=</span>
                  <span className='code-keyword'>this</span>
                  <span className='code-operator'>.</span>
                  <span className='code-method'>hash</span>
                  <span className='code-bracket'>(</span>
                  <span className='code-param'>key</span>
                  <span className='code-bracket'>)</span>
                </div>
                <div className='code-line code-line--fade'>...</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='features'>
        <div className='features-container'>
          <h2 className='section-title'>Interactive Learning Experience</h2>
          <div className='features-grid'>
            <div className='feature-card'>
              <div className='feature-icon'>
                <svg viewBox='0 0 24 24' fill='currentColor'>
                  <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                </svg>
              </div>
              <h3 className='feature-title'>Real-time Visualization</h3>
              <p className='feature-description'>
                Watch data structures come to life with interactive animations
                that demonstrate core computer science concepts
              </p>
            </div>

            <div className='feature-card'>
              <div className='feature-icon'>
                <svg viewBox='0 0 24 24' fill='currentColor'>
                  <path d='M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z' />
                </svg>
              </div>
              <h3 className='feature-title'>Clean Architecture</h3>
              <p className='feature-description'>
                Built with TypeScript, React, and modern development practices
                following SOLID principles and clean code standards
              </p>
            </div>

            <div className='feature-card'>
              <div className='feature-icon'>
                <svg viewBox='0 0 24 24' fill='currentColor'>
                  <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
                </svg>
              </div>
              <h3 className='feature-title'>Educational Focus</h3>
              <p className='feature-description'>
                Designed to help students and developers understand complex
                algorithms through step-by-step interactive demonstrations
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className='about'>
        <div className='about-container'>
          <div className='about-content'>
            <h2 className='section-title'>About This Project</h2>
            <p className='about-text'>
              This project demonstrates modern software engineering practices
              through interactive visualizations of fundamental computer science
              concepts. Built with a focus on clean architecture, type safety,
              and user experience.
            </p>
            <div className='tech-stack'>
              <h3 className='tech-title'>Technology Stack</h3>
              <div className='tech-grid'>
                <span className='tech-item'>TypeScript</span>
                <span className='tech-item'>React 19</span>
                <span className='tech-item'>Vite</span>
                <span className='tech-item'>CSS3</span>
                <span className='tech-item'>ESLint</span>
              </div>
            </div>
          </div>
          <div className='about-author'>
            <div className='author-card'>
              <div className='author-avatar'>
                <svg viewBox='0 0 24 24' fill='currentColor'>
                  <path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
                </svg>
              </div>
              <div className='author-info'>
                <h3 className='author-name'>Rennan Ribas</h3>
                <p className='author-title'>Software Engineer</p>
                <a
                  href='https://github.com/rennanribas'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='author-link'
                >
                  github.com/rennanribas
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
