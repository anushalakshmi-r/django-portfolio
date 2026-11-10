import "./PortfolioPreview.css";

const themeLabels = {
  modern: "Modern",
  minimalist: "Minimalist",
  creative: "Creative",
};

const projectLayouts = {
  modern: "grid grid-cols-1 gap-4 md:grid-cols-2",
  minimalist: "grid grid-cols-1 gap-4",
  creative: "grid grid-cols-1 gap-4 md:grid-cols-2",
};

const isSafeProjectUrl = (url) => /^https?:\/\/\S+$/i.test(url);

function PortfolioPreview({ data, selectedTheme, onBack }) {
  const { personalInfo, skills, projects } = data;
  const theme = themeLabels[selectedTheme] ? selectedTheme : "modern";

  return (
    <div className={`preview-shell preview-theme-${theme}`}>
      <header className="preview-topbar flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="preview-brand">
          <span className="preview-brand-mark" aria-hidden="true">
            PF
          </span>
          <span>Portfolio Studio</span>
        </div>
        <div className="preview-toolbar">
          <span className="preview-theme-label">{themeLabels[theme]} theme</span>
          <button
            className="button preview-back-button"
            type="button"
            onClick={onBack}
          >
            <span aria-hidden="true">←</span> Back to Form
          </button>
        </div>
      </header>

      <section className="preview-hero" aria-labelledby="portfolio-name">
        <div className="preview-hero-copy">
          <p className="preview-eyebrow">HELLO, I’M</p>
          <h1 id="portfolio-name">{personalInfo.name || "Your Name"}</h1>
          <p className="preview-title">
            {personalInfo.title || "Your professional title"}
          </p>
          <p className="preview-bio">
            {personalInfo.bio ||
              "Add a short introduction in the form to tell visitors a little about yourself."}
          </p>
        </div>
        <div className="preview-orbit" aria-hidden="true">
          <span className="preview-orbit-inner">P</span>
        </div>
      </section>

      <section className="preview-section" aria-labelledby="preview-skills">
        <div className="preview-section-heading">
          <p className="preview-eyebrow">WHAT I BRING</p>
          <h2 id="preview-skills">Skills &amp; strengths</h2>
        </div>
        {skills.length > 0 ? (
          <ul className="preview-skills-grid grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, index) => (
              <li className="preview-skill-card" key={`${skill}-${index}`}>
                <span className="preview-skill-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="preview-empty">
            Add a few skills in the form to highlight your strengths.
          </p>
        )}
      </section>

      <section className="preview-section" aria-labelledby="preview-projects">
        <div className="preview-section-heading">
          <p className="preview-eyebrow">SELECTED WORK</p>
          <h2 id="preview-projects">Projects</h2>
        </div>
        {projects.length > 0 ? (
          <div className={`preview-project-grid ${projectLayouts[theme]}`}>
            {projects.map((project, index) => (
              <article
                className="preview-project-card"
                key={`${project.title}-${index}`}
              >
                <span className="preview-project-index">
                  PROJECT / {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{project.title || "Untitled project"}</h3>
                <p>
                  {project.description || "A little more about this project."}
                </p>
                {isSafeProjectUrl(project.url) && (
                  <a
                    className="preview-project-link"
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visit project <span aria-hidden="true">↗</span>
                  </a>
                )}
              </article>
            ))}
          </div>
        ) : (
          <p className="preview-empty">
            Your projects will appear here once you add them.
          </p>
        )}
      </section>

      <footer className="preview-contact flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="preview-eyebrow">LET’S CONNECT</p>
          <h2>Have a project in mind?</h2>
          <p className="preview-contact-copy">
            I’d love to hear what you’re working on.
          </p>
        </div>
        {personalInfo.email ? (
          <a className="preview-contact-link" href={`mailto:${personalInfo.email}`}>
            {personalInfo.email} <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <p className="preview-empty">
            Add a contact email in the form to share it here.
          </p>
        )}
      </footer>
    </div>
  );
}

export default PortfolioPreview;
