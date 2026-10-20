
import "./About.css";

const themes = [
  {
    icon: "📚",
    title: "The Gurukul System",
    description: "Explore traditional learning and the teacher-student relationship.",
  },
  {
    icon: "🧘",
    title: "Yoga and Meditation",
    description: "Discover traditions of movement, breath, attention, and philosophy.",
  },
  {
    icon: "🌿",
    title: "Ayurveda and Nature",
    description: "Learn about traditional Indian approaches to health, plants, and lifestyle.",
  },
  {
    icon: "🏛️",
    title: "Ancient Indian Architecture",
    description: "Appreciate historic buildings, artistic detail, and regional design.",
  },
];

function About({ onExplore }) {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-eyebrow">ABOUT PARAMPARA</span>
          <h1>
            Rooted in tradition,
            <br />
            <span>built for tomorrow.</span>
          </h1>
          <p>
            Parampara is a journey through India's rich heritage, traditional
            knowledge systems, and cultural traditions. We bring history,
            ideas, and learning together in one welcoming space.
          </p>
          <button className="about-primary-button" onClick={onExplore}>
            Explore our heritage <span>→</span>
          </button>
        </div>

        <div className="about-hero-art" role="img" aria-label="Illustration of Indian heritage">
          <div className="about-art-symbol">ॐ</div>
          <div className="about-art-caption">ज्ञान • परंपरा • संस्कृति</div>
          <div className="about-art-subcaption">Knowledge • Tradition • Culture</div>
        </div>
      </section>

      <section className="about-intro">
        <div className="about-story">
          <span className="about-eyebrow">OUR STORY</span>
          <h2>What is Parampara?</h2>
          <p>
            The word <em>Parampara</em> refers to a tradition or a succession
            through which knowledge and practices are passed from one
            generation to another.
          </p>
          <p>
            Our website introduces visitors to different aspects of India's
            heritage through accessible explanations, topic pages, and
            interactive learning. We aim to encourage curiosity while
            respecting the diversity of India's regions, communities, and
            historical experiences.
          </p>
          <div className="about-signature">
            Preserving the past. Inspiring the future.
          </div>
        </div>

        <div className="about-mission">
          <span className="about-eyebrow">OUR MISSION</span>
          <h2>Learn, appreciate, and explore.</h2>
          <p>Parampara aims to help visitors:</p>

          <ul className="about-mission-list">
            <li><span>✓</span> Discover India's diverse knowledge traditions</li>
            <li><span>✓</span> Learn through clear, engaging content</li>
            <li><span>✓</span> Explore heritage with curiosity and context</li>
            <li><span>✓</span> Continue learning through further reading</li>
          </ul>
        </div>
      </section>

      <section className="about-themes">
        <div className="about-section-heading">
          <span className="about-eyebrow">EXPLORE WITH US</span>
          <h2>What you'll discover</h2>
          <p>Start with these themes and follow your curiosity.</p>
        </div>

        <div className="about-theme-grid">
          {themes.map((theme) => (
            <article className="about-theme-card" key={theme.title}>
              <div className="about-theme-icon" aria-hidden="true">
                {theme.icon}
              </div>
              <h3>{theme.title}</h3>
              <p>{theme.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-vision">
        <span className="about-eyebrow">OUR VISION</span>
        <h2>Tradition is a bridge between generations.</h2>
        <p>
          We envision a learning space where traditional knowledge can be
          explored thoughtfully, understood in context, and connected with
          questions that matter today.
        </p>
        <button className="about-primary-button" onClick={onExplore}>
          Begin exploring <span>→</span>
        </button>
      </section>

      <p className="about-note">
        Parampara is an educational project. Historical interpretations and
        traditional knowledge should be explored using reliable sources and
        appropriate context.
      </p>
    </main>
  );
}

export default About;
