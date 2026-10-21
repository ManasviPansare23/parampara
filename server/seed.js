
require("dotenv").config();
const mongoose = require("mongoose");
const Topic = require("./models/Topic");

const topics = [
  {
    title: "Gurukul Education",
    category: "Education",
    icon: "📚",
    description: "Explore the traditional Indian system of learning.",
    intro: "Gurukuls emphasized learning, discipline, and the relationship between teacher and student.",
    points: [
      "Learning often took place in a teacher's home or ashram.",
      "Students studied subjects suited to their education and traditions.",
      "Oral learning, discussion, and practice were important methods."
    ],
    activity: "Compare a traditional gurukul with a modern classroom.",
    takeaway: "Education can nurture knowledge, character, and responsibility."
  },
  {
    title: "Yoga",
    category: "Wellness",
    icon: "🧘",
    description: "Discover yoga's philosophical and practical traditions.",
    intro: "Yoga includes physical, mental, and philosophical practices developed in India.",
    points: [
      "Yoga includes more than physical postures.",
      "Breathing and meditation are important in many traditions.",
      "Different yoga traditions have different approaches and goals."
    ],
    activity: "Write down three ways to create a calm daily routine.",
    takeaway: "Regular practice can support attention and self-awareness."
  },
  {
    title: "Ayurveda",
    category: "Knowledge Systems",
    icon: "🌿",
    description: "Learn about India's traditional medical knowledge system.",
    intro: "Ayurveda is a historical Indian system of health concepts and practices.",
    points: [
      "It has a long textual and teaching tradition.",
      "Diet and daily routines are important in Ayurvedic theory.",
      "Traditional claims should be evaluated carefully using modern evidence."
    ],
    activity: "Explore the history of an Ayurvedic text using reliable sources.",
    takeaway: "Study traditional health systems thoughtfully and critically."
  },
  {
    title: "Indian Architecture",
    category: "Architecture",
    icon: "🏛️",
    description: "Explore India's diverse architectural heritage.",
    intro: "Indian architecture includes temples, stepwells, forts, palaces, and many other forms.",
    points: [
      "Building styles vary across regions and historical periods.",
      "Materials and designs often reflect local environments.",
      "Architecture can reveal religious, social, and technological histories."
    ],
    activity: "Choose a historical Indian structure and identify three design features.",
    takeaway: "Buildings preserve important clues about the past."
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await Topic.deleteMany({});
    await Topic.insertMany(topics);

    console.log("Parampara topics added successfully!");
  } catch (error) {
    console.error("Seeding failed:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
