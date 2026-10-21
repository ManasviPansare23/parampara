
import { useEffect, useState } from "react";
import "./App.css";
import Quiz from "./Quiz";
import About from "./About";
import Resources from "./Resources";
import WisdomVault from "./WisdomVault";
const topics = [
  {
    id: 1,
    title: "The Gurukul System",
    category: "Education",
    icon: "📚",
    image: "/images/gurukul.jpeg",
    description:
      "Discover the ancient Indian education system, where students learned from their guru in a close-knit learning environment.",
    intro:
      "The Gurukul system was a traditional form of education in which students lived with their guru and learned through study, practice, discipline, and daily life.",
    points: [
      "Learning under the guidance of a guru",
      "Emphasis on character, discipline, and knowledge",
      "Learning through discussion, practice, and observation",
    ],
    activity: "Compare learning in a traditional Gurukul with learning in a modern classroom.",
    takeaway: "Education can develop character and practical skills as well as knowledge.",
    readings: ["Ancient Indian education", "The teacher-student tradition"],
  },
  {
    id: 2,
    title: "Yoga and Meditation",
    category: "Wellness",
    icon: "🧘",
    image: "/images/yoga.jpeg",
    description:
      "Explore traditional Indian practices that connect physical well-being, breath, attention, and mental discipline.",
    intro:
      "Yoga has a long history in India. Its traditions include physical postures, breathing practices, meditation, ethical principles, and methods of self-discipline.",
    points: [
      "Awareness of breath and body",
      "Concentration and meditation",
      "Balance between physical and mental practices",
    ],
    activity: "Sit comfortably and observe your natural breathing for one minute.",
    takeaway: "Small, consistent moments of attention can encourage calm and self-awareness.",
    readings: ["Patanjali's Yoga Sutras", "History of yoga in India"],
  },
  {
    id: 3,
    title: "Ayurveda and Nature",
    category: "Wellness",
    icon: "🌿",
    image: "/images/ayurveda.jpeg",
    description:
      "Learn about Ayurveda, a traditional Indian system that emphasizes lifestyle, food, and ideas of balance.",
    intro:
      "Ayurveda is a traditional Indian health system with historical approaches to diet, daily routines, medicinal plants, and well-being.",
    points: [
      "Daily routines and lifestyle",
      "Traditional knowledge of plants",
      "Food, environment, and ideas of balance",
    ],
    activity: "Choose a local plant and research its traditional uses and botanical identity.",
    takeaway: "Traditional knowledge is worth exploring alongside modern scientific evidence.",
    readings: ["History of Ayurveda", "Traditional Indian botanical knowledge"],
  },
  {
    id: 4,
    title: "Ancient Indian Architecture",
    category: "Architecture",
    icon: "🏛️",
    image: "/images/architecture.png",
    description:
      "Discover the design, geometry, craftsmanship, and symbolism of India's historic buildings.",
    intro:
      "Indian architectural traditions developed across many regions and periods, from early urban settlements to rock-cut caves, temples, stupas, and monumental structures.",
    points: [
      "Regional building materials and techniques",
      "Geometry, symmetry, and spatial planning",
      "Sculpture, symbolism, and craftsmanship",
    ],
    activity: "Look at a historic Indian building and identify its shapes, materials, and decorative patterns.",
    takeaway: "Architecture can reveal how people lived, built, worshipped, and expressed their ideas.",
    readings: ["Indian temple architecture", "Ancient Indian monuments"],
  },
];

const categories = ["All", "Education", "Wellness", "Architecture"];

function App() {
  const [selectedTopic, setSelectedTopic] = useState(null);
const [searchTerm, setSearchTerm] = useState("");
const [activeCategory, setActiveCategory] = useState("All");
const [showAbout, setShowAbout] = useState(false);
const [showResources, setShowResources] = useState(false);
const [showVault, setShowVault] = useState(false);
const [databaseTopics, setDatabaseTopics] = useState([]);
const [topicsLoading, setTopicsLoading] = useState(true);
const [topicsError, setTopicsError] = useState("");

useEffect(() => {
  async function fetchTopics() {
    try {
      const response = await fetch("http://localhost:5000/api/topics");

      if (!response.ok) {
        throw new Error("Failed to load topics");
      }

      const data = await response.json();
      setDatabaseTopics(data);
    } catch (error) {
      console.error("Error loading topics:", error);
      setTopicsError("Could not load topics from the database.");
    } finally {
      setTopicsLoading(false);
    }
  }

  fetchTopics();
}, []);

const availableTopics =
  databaseTopics.length > 0 ? databaseTopics : topics;

  const filteredTopics = availableTopics.filter((topic) => {
    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      topic.title.toLowerCase().includes(search) ||
      topic.description.toLowerCase().includes(search) ||
      topic.category.toLowerCase().includes(search);

    const matchesCategory =
      activeCategory === "All" || topic.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  function openTopic(topic) {
    setSelectedTopic(topic);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goHome(){
  setSelectedTopic(null);
  setSearchTerm("");
  setActiveCategory("All");
  setShowAbout(false);
  setShowResources(false);
  setShowVault(false);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

  return (
    <div className="app">
      <header className="navbar">
        <button className="brand" onClick={goHome} aria-label="Parampara home">
          <span className="brand-icon">❋</span>
          <span>Parampara</span>
        </button>

        
<nav className="nav-links">
  <button onClick={goHome}>Home</button>
  <a href="#explore">Explore</a>

  <button
    onClick={() => {
      setSelectedTopic(null);
      setShowResources(false);
      setShowAbout(true);
      setShowVault(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
  >
    About
  </button>
  
</nav>

<button
  onClick={() => {
    setSelectedTopic(null);
    setShowAbout(false);
    setShowResources(true);
    setShowVault(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }}
>
  Resources
</button>

      </header>

     
{showVault ? (
  <WisdomVault onHome={goHome} />
) : showResources ? (
  <Resources onHome={goHome} />
) : showAbout ? (
  <About onExplore={goHome} />
) : !selectedTopic ? (
  // Keep your existing homepage JSX here
  <>
  
          <section className="hero">
            <div className="hero-content">
              <span className="eyebrow">INDIA'S TIMELESS WISDOM</span>
              <h1>
                Discover the wisdom
                <br />
                of <span>our ancestors.</span>
              </h1>
              <p>
                Explore India's rich heritage of knowledge, traditions,
                education, and ways of life — preserved across generations.
              </p>
              <a className="primary-button" href="#explore">
                Explore traditions <span>→</span>
              </a>
              <button
  className="wisdom-vault-launch"
  onClick={() => {
    setSelectedTopic(null);
    setShowAbout(false);
    setShowResources(false);
    setShowVault(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }}
>
  ✦ ENTER THE WISDOM VAULT →
</button>
            </div>

            <div className="hero-art" aria-label="Illustration of Indian heritage">
              <div className="sun"></div>
              <div className="art-circle">
                <span>ॐ</span>
              </div>
              <div className="art-caption">ज्ञानम् परमं बलम्</div>
              <div className="art-subcaption">Knowledge is strength</div>
            </div>
          </section>

          <main id="explore" className="explore-section">
            <div className="section-heading">
              <span className="eyebrow">A JOURNEY THROUGH TIME</span>
              <h2>Explore our heritage</h2>
              <p>
                Begin your journey into the ideas and traditions that shaped
                generations.
              </p>
            </div>

            <div className="search-panel">
              <label className="search-box">
                <span className="search-icon" aria-hidden="true">⌕</span>
                <input
                  type="search"
                  placeholder="Search traditions, yoga, education..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  aria-label="Search heritage topics"
                />
                {searchTerm && (
                  <button
                    className="clear-search"
                    onClick={() => setSearchTerm("")}
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </label>

              <div className="filter-row">
                <span className="filter-label">Categories</span>
                <div className="filter-buttons">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`filter-button ${
                        activeCategory === category ? "active" : ""
                      }`}
                      onClick={() => setActiveCategory(category)}
                      aria-pressed={activeCategory === category}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="results-heading">
              <h3>{activeCategory === "All" ? "Discover topics" : activeCategory}</h3>
              <span>
                {filteredTopics.length} {filteredTopics.length === 1 ? "topic" : "topics"}
              </span>
            </div>

            {filteredTopics.length > 0 ? (
              <div className="topic-grid">
                {filteredTopics.map((topic) => (
                  <button
                    className="topic-card"
                    key={topic.id}
                    onClick={() => openTopic(topic)}
                  >
                    <div className="topic-image-container">
                      
                      <img
                        className="topic-image"
                        src={topic.image}
                        alt={topic.title}
                        loading="lazy"
                      />

                    </div>
                    <span className="topic-category">{topic.category}</span>
                    <h3>{topic.title}</h3>
                    <p>{topic.description}</p>
                    <span className="card-link">
                      Discover more <span>↗</span>
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <span>🔎</span>
                <h3>No topics found</h3>
                <p>Try another keyword or choose a different category.</p>
                <button className="primary-button" onClick={goHome}>
                  Clear search and filters
                </button>
              </div>
            )}
          </main>
        </>
      ) : (
        <main className="detail-page">
          <button className="back-button" onClick={goHome}>
            ← Back to all topics
          </button>

          <div className="detail-hero">
            <div className={`topic-icon icon-${selectedTopic.id}`}>
              {selectedTopic.icon}
            </div>
            <span className="topic-category">{selectedTopic.category}</span>
            <h1>{selectedTopic.title}</h1>
            <p>{selectedTopic.description}</p>
          </div>

          <section className="detail-section">
            <h2>Understanding the tradition</h2>
            <p>{selectedTopic.intro}</p>
          </section>

          <section className="detail-section">
            <h2>Key ideas</h2>
            <div className="key-points">
              {selectedTopic.points.map((point, index) => (
                <div className="key-point" key={point}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{point}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="activity-panel">
            <span className="eyebrow">LEARN BY DOING</span>
            <h2>Try this activity</h2>
            <p>{selectedTopic.activity}</p>
          </section>

          <section className="takeaway-panel">
            <span>✦ A THOUGHT TO REMEMBER</span>
            <p>{selectedTopic.takeaway}</p>
          </section>

          <section className="detail-section readings">
            <h2>Continue exploring</h2>
            <p>Suggested topics for further reading:</p>
            <ul>
              {selectedTopic.readings.map((reading) => (
                <li key={reading}>{reading}</li>
              ))}
            </ul>
            <p className="source-note">
              These are suggested research topics, not verified citations.
              Consult reliable historical and academic sources for further study.
            </p>
          </section>

          <button className="primary-button" onClick={goHome}>
            Explore all traditions <span>→</span>
          </button>
        
        </main>
      )}

      <footer id="about" className="footer">
        <div className="footer-brand">❋ Parampara</div>
        <p>
          Preserving the past. Exploring knowledge. Inspiring the future.
        </p>
        <span>Made with care for India's rich heritage.</span>
      </footer>
    </div>
  );
}

export default App;
