
const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    icon: String,
    image: String,
    description: String,
    intro: String,
    points: [String],
    activity: String,
    takeaway: String,
    readings: [
      {
        title: String,
        url: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Topic", topicSchema);
