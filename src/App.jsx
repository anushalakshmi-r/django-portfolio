import { useState } from "react";
import "./App.css";
import PortfolioPreview from "./PortfolioPreview.jsx";

const emptyProject = () => ({ title: "", description: "", url: "" });

function App() {
  const [formData, setFormData] = useState({
    personalInfo: {
      name: "",
      title: "",
      email: "",
      bio: "",
    },
    skills: [],
    projects: [],
  });
  const [selectedTheme, setSelectedTheme] = useState("modern");
  const [isEditing, setIsEditing] = useState(true);

  const handlePersonalInfoChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      personalInfo: { ...current.personalInfo, [name]: value },
    }));
  };

  const handleAddSkill = (event) => {
    event.preventDefault();
    const skill = String(
      new FormData(event.currentTarget).get("skill") ?? "",
    ).trim();

    if (!skill) {
      return;
    }

    setFormData((current) => ({
      ...current,
      skills: [...current.skills, skill],
    }));
    event.currentTarget.reset();
  };

  const handleProjectChange = (index, event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      projects: current.projects.map((project, projectIndex) =>
        projectIndex === index ? { ...project, [name]: value } : project,
      ),
    }));
  };

  return (
    <main className={`portfolio-builder theme-${selectedTheme} px-4 py-7 sm:px-8 sm:py-12 lg:px-6`}>
      {isEditing ? (
        <>
      <header className="page-header grid grid-cols-[44px_minmax(0,1fr)] gap-[13px] sm:grid-cols-[52px_minmax(0,1fr)_auto] sm:gap-[18px]">
        <div className="brand-mark" aria-hidden="true">
          PF
        </div>
        <div>
          <p className="eyebrow">PORTFOLIO STUDIO</p>
          <h1>Build your portfolio</h1>
          <p className="page-description">
            Add the details that show people what you do best.
          </p>
        </div>
        <label className="theme-picker">
          <span>Preview style</span>
          <select
            value={selectedTheme}
            onChange={(event) => setSelectedTheme(event.target.value)}
          >
            <option value="modern">Modern</option>
            <option value="minimalist">Minimalist</option>
            <option value="creative">Creative</option>
          </select>
        </label>
      </header>

      <div className="form-layout">
        <section className="form-card" aria-labelledby="personal-heading">
          <div className="section-heading">
            <span className="section-number">01</span>
            <div>
              <h2 id="personal-heading">Personal information</h2>
              <p>Start with a little introduction.</p>
            </div>
          </div>

          <div className="field-grid grid grid-cols-1 gap-x-4 gap-y-[17px] sm:grid-cols-2">
            <label className="field">
              <span>Name</span>
              <input
                type="text"
                name="name"
                value={formData.personalInfo.name}
                onChange={handlePersonalInfoChange}
                placeholder="e.g. Alex Morgan"
                autoComplete="name"
              />
            </label>
            <label className="field">
              <span>Professional title</span>
              <input
                type="text"
                name="title"
                value={formData.personalInfo.title}
                onChange={handlePersonalInfoChange}
                placeholder="e.g. Software Engineer"
              />
            </label>
            <label className="field">
              <span>Contact email</span>
              <input
                type="email"
                name="email"
                value={formData.personalInfo.email}
                onChange={handlePersonalInfoChange}
                placeholder="e.g. alex@example.com"
                autoComplete="email"
              />
            </label>
            <label className="field field-full">
              <span>Bio</span>
              <textarea
                name="bio"
                value={formData.personalInfo.bio}
                onChange={handlePersonalInfoChange}
                placeholder="Share a few words about your work and what inspires you."
                rows="4"
              />
            </label>
          </div>
        </section>

        <section className="form-card" aria-labelledby="skills-heading">
          <div className="section-heading">
            <span className="section-number">02</span>
            <div>
              <h2 id="skills-heading">Skills</h2>
              <p>Highlight the tools and strengths you bring.</p>
            </div>
          </div>

          <form className="add-row" onSubmit={handleAddSkill}>
            <label className="field add-field">
              <span className="visually-hidden">Add a skill</span>
              <input
                type="text"
                name="skill"
                placeholder="e.g. React, Product design"
              />
            </label>
            <button className="button button-secondary" type="submit">
              <span aria-hidden="true">+</span> Add skill
            </button>
          </form>

          {formData.skills.length > 0 ? (
            <ul className="skill-list">
              {formData.skills.map((skill, index) => (
                <li className="skill-chip" key={`${skill}-${index}`}>
                  <span>{skill}</span>
                  <button
                    className="icon-button"
                    type="button"
                    aria-label={`Remove ${skill}`}
                    onClick={() =>
                      setFormData((current) => ({
                        ...current,
                        skills: current.skills.filter(
                          (_, skillIndex) => skillIndex !== index,
                        ),
                      }))
                    }
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-hint">Your skills will appear here.</p>
          )}
        </section>

        <section className="form-card" aria-labelledby="projects-heading">
          <div className="section-heading section-heading-projects sm:flex-nowrap">
            <span className="section-number">03</span>
            <div>
              <h2 id="projects-heading">Projects</h2>
              <p>Showcase a few things you’ve made.</p>
            </div>
            <button
              className="button button-secondary w-full sm:w-auto"
              type="button"
              onClick={() =>
                setFormData((current) => ({
                  ...current,
                  projects: [...current.projects, emptyProject()],
                }))
              }
            >
              <span aria-hidden="true">+</span> Add project
            </button>
          </div>

          {formData.projects.length > 0 ? (
            <div className="project-list">
              {formData.projects.map((project, index) => (
                <fieldset className="project-entry" key={index}>
                  <legend>Project {index + 1}</legend>
                  <button
                    className="remove-project"
                    type="button"
                    aria-label={`Remove project ${index + 1}`}
                    onClick={() =>
                      setFormData((current) => ({
                        ...current,
                        projects: current.projects.filter(
                          (_, projectIndex) => projectIndex !== index,
                        ),
                      }))
                    }
                  >
                    Remove
                  </button>
                  <div className="field-grid grid grid-cols-1 gap-x-4 gap-y-[17px] sm:grid-cols-2">
                    <label className="field">
                      <span>Project title</span>
                      <input
                        type="text"
                        name="title"
                        value={project.title}
                        onChange={(event) =>
                          handleProjectChange(index, event)
                        }
                        placeholder="e.g. Personal website"
                      />
                    </label>
                    <label className="field">
                      <span>Project URL</span>
                      <input
                        type="url"
                        name="url"
                        value={project.url}
                        onChange={(event) =>
                          handleProjectChange(index, event)
                        }
                        placeholder="https://example.com"
                      />
                    </label>
                    <label className="field field-full">
                      <span>Description</span>
                      <textarea
                        name="description"
                        value={project.description}
                        onChange={(event) =>
                          handleProjectChange(index, event)
                        }
                        placeholder="What did you create, and what was your role?"
                        rows="3"
                      />
                    </label>
                  </div>
                </fieldset>
              ))}
            </div>
          ) : (
            <div className="empty-projects">
              <span className="empty-projects-icon" aria-hidden="true">
                ↗
              </span>
              <p>No projects added yet.</p>
              <span>Use “Add project” to create your first entry.</span>
            </div>
          )}
        </section>
      </div>

      <footer className="page-footer">
        <span className="status-dot" aria-hidden="true" />
        Your portfolio details update as you type.
      </footer>
      <div className="form-actions">
        <button
          className="button button-primary"
          type="button"
          onClick={() => setIsEditing(false)}
        >
          Generate Portfolio <span aria-hidden="true">→</span>
        </button>
      </div>
        </>
      ) : (
        <PortfolioPreview
          data={formData}
          selectedTheme={selectedTheme}
          onBack={() => setIsEditing(true)}
        />
      )}
    </main>
  );
}

export default App;
