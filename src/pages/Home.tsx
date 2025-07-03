import { Link } from 'react-router-dom'

export const Home = () => {
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
              <Link
                to='/data-structures'
                className='cta-button cta-button--primary'
              >
                Explore Data Structures
              </Link>
              <Link to='/eventloop' className='cta-button cta-button--primary'>
                Explore Event Loop
              </Link>
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
          <div className='features-grid'>
            <div className='feature-card'>
              <h3 className='feature-title'>Real-time Visualization</h3>
              <p className='feature-description'>
                Watch data structures come to life with interactive animations
                that demonstrate core computer science concepts
              </p>
            </div>

            <div className='feature-card'>
              <h3 className='feature-title'>Clean Architecture</h3>
              <p className='feature-description'>
                Built with TypeScript, React, and modern development practices
                following SOLID principles and clean code standards
              </p>
            </div>

            <div className='feature-card'>
              <h3 className='feature-title'>Educational Focus</h3>
              <p className='feature-description'>
                Designed to help students and developers understand complex
                algorithms through step-by-step interactive demonstrations
              </p>
            </div>

            <div className='feature-card'>
              <h3 className='feature-title'>Modern Pipeline</h3>
              <p className='feature-description'>
                Explore our automated deployment pipeline using React 19.1,
                Tailwind v4, Motion animations, and modern AWS infrastructure
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
