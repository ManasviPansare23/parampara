
import { useState } from "react";
import "./Resources.css";

const resources = [
  {
    category: "Education",
    icon: "📚",
    title: "Ancient Education System of India",
    organization: "NCERT",
    description:
      "An educational chapter discussing gurukuls, teachers, students, and learning traditions in historical India.",
    url: "https://www.ncert.nic.in/textbook/pdf/heih108.pdf",
    type: "Educational reading",
  },
  {
    category: "Education",
    icon: "🎓",
    title: "National Curriculum Framework",
    organization: "NCERT",
    description:
      "Explore educational perspectives on learning, holistic development, and the teacher-student relationship.",
    url: "https://www.ncert.nic.in/pdf/focus-group/NCF-FS_2022EN.pdf",
    type: "Curriculum document",
  },
  {
    category: "Yoga",
    icon: "🧘",
    title: "Yoga and Intangible Cultural Heritage",
    organization: "UNESCO",
    description:
      "Learn how yoga is practised and transmitted across generations as part of India's cultural heritage.",
    url: "https://ich.unesco.org/en/RL/yoga-01163",
    type: "Cultural heritage record",
  },
  {
    category: "Yoga",
    icon: "🌱",
    title: "Yoga: UNESCO Multimedia Archive",
    organization: "UNESCO",
    description:
      "Explore additional material documenting yoga traditions and their place in Indian society.",
    url: "https://www.unesco.org/archives/multimedia/document-4376",
    type: "Multimedia resource",
  },
  {
    category: "Ayurveda",
    icon: "🌿",
    title: "AYUSH Research Portal",
    organization: "Ministry of Ayush, Government of India",
    description:
      "Search a research portal containing publications and research records related to Ayurveda and other traditional health systems.",
    url: "https://arp.ayush.gov.in/",
    type: "Research database",
  },
  {
    category: "Ayurveda",
    icon: "🔎",
    title: "AYUSH Research Information",
    organization: "Ministry of Ayush, Government of India",
    description:
      "Learn about the portal's research resources and ways to explore evidence related to traditional health systems.",
    url: "https://arp.ayush.gov.in/researchabout",
    type: "Research information",
  },
  {
    category: "Architecture",
    icon: "🏛️",
    title: "Archaeological Survey of India",
    organization: "Government of India",
    description:
      "Explore archaeological research, historic monuments, museums, and heritage conservation in India.",
    url: "https://asi.nic.in/",
    type: "Official heritage resource",
  },
  {
    category: "Architecture",
    icon: "🛕",
    title: "Khajuraho Group of Monuments",
    organization: "UNESCO World Heritage Centre",
    description:
      "Read about the history, sculpture, and architectural features of the historic Khajuraho temples.",
    url: "https://whc.unesco.org/en/list/240",
    type: "World Heritage record",
  },
  {
    category: "Architecture",
    icon: "🪨",
    title: "Evolution of Temple Architecture",
    organization: "UNESCO World Heritage Centre",
    description:
      "Study the development of cave and temple architecture at Aihole, Badami, and Pattadakal.",
    url: "https://whc.unesco.org/en/tentativelists/5972",
    type: "Heritage research",
  },
];

const categories = [
  "All",
  "Education",
  "Yoga",
  "Ayurveda",
  "Architecture",
];

function Resources({ onHome }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResources = resources.filter((resource) => {
    const matchesCategory =
      activeCategory === "All" ||
      resource.category === activeCategory;

    const searchableText = [
      resource.title,
      resource.organization,
      resource.description,
      resource.category,
      resource.type,
    ]
      .join(" ")
      .toLowerCase();

    return (
      matchesCategory &&
      searchableText.includes(searchTerm.toLowerCase().trim())
    );
  });

  return (
    <main className="resources-page">
      <section className="resources-hero">
        <span className="resources-eyebrow">THE LEARNING LIBRARY</span>
        <h1>
          Explore. Learn.
          <br />
          <span>Discover the sources.</span>
        </h1>
        <p>
          A curated starting point for exploring India's educational
          traditions, yoga, Ayurveda, and architectural heritage through
          institutional and educational resources.
        </p>
        <div className="resources-hero-note">
          <span>✦</span> Knowledge grows when curiosity meets research.
        </div>
      </section>

      <section className="resources-content">
        <div className="resources-heading">
          <div>
            <span className="resources-eyebrow">FURTHER READING</span>
            <h2>Resources and references</h2>
            <p>
              Choose a topic or search the collection to find a useful source.
            </p>
          </div>
          <span className="resources-count">
            {filteredResources.length} resources
          </span>
        </div>

        <label className="resources-search">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            placeholder="Search topics, titles, or organizations..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            aria-label="Search resources"
          />
        </label>

        <div className="resources-filters" aria-label="Filter resources">
          {categories.map((category) => (
            <button
              key={category}
              className={
                activeCategory === category
                  ? "resources-filter active"
                  : "resources-filter"
              }
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="resources-grid">
          {filteredResources.map((resource) => (
            <article className="resource-card" key={resource.title}>
              <div className="resource-card-top">
                <span className="resource-icon" aria-hidden="true">
                  {resource.icon}
                </span>
                <span className="resource-category">
                  {resource.category}
                </span>
              </div>

              <span className="resource-type">{resource.type}</span>
              <h3>{resource.title}</h3>
              <p className="resource-organization">
                {resource.organization}
              </p>
              <p className="resource-description">
                {resource.description}
              </p>

              <a
                className="resource-link"
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read resource <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="resources-empty">
            <span>🔎</span>
            <h3>No resources found</h3>
            <p>Try another search term or select a different category.</p>
            <button
              className="resources-reset"
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      <section className="resources-guidance">
        <span className="resources-eyebrow">READ THOUGHTFULLY</span>
        <h2>How to use these resources</h2>
        <div className="resources-guidance-grid">
          <div>
            <span>01</span>
            <h3>Check the source</h3>
            <p>
              Look at the author, publishing institution, date, and references.
            </p>
          </div>
          <div>
            <span>02</span>
            <h3>Compare perspectives</h3>
            <p>
              Read multiple sources and consider the historical and regional
              context.
            </p>
          </div>
          <div>
            <span>03</span>
            <h3>Separate tradition and evidence</h3>
            <p>
              Cultural importance and historical claims are different from
              claims that have been scientifically tested.
            </p>
          </div>
        </div>
      </section>

      <section className="resources-footer-cta">
        <h2>Keep exploring India's heritage.</h2>
        <p>
          Return to Parampara's topics and continue your learning journey.
        </p>
        <button className="resources-home-button" onClick={onHome}>
          Back to Explore <span>→</span>
        </button>
      </section>

      <p className="resources-disclaimer">
        These links are provided for educational research. Some sources
        describe traditional or cultural perspectives; their inclusion does
        not imply that every historical interpretation or health claim has
        been independently verified. External websites have their own content
        and policies.
      </p>
    </main>
  );
}

export default Resources;
