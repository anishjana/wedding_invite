export const DATE = new Date("2026-12-05T00:00:00");
export const DATE_LABEL = "December 5, 2026";
export const couple = {
  a: "Anish",
  b: "Ankita",
  venue: "Dolphin Beach Resort, Mandarmoni",
  tag: "#Ankish",
};
export const families = [
  {
    title: "Bride's Family",
    host: "Mrs. Gopa Pradhan & Mr. Sibayan Pradhan",
    pg: "Late Smt. Kamla Sharma & Late Shri Mohan Sharma",
    mg: "Late Smt. Saroj Verma & Late Shri Gopal Verma",
  },
  {
    title: "Groom's Family",
    host: "Mrs. Nipu Jana & Mr. Ansuman Jana",
    pg: "Late Smt. Radha Kapoor & Late Shri Vijay Kapoor",
    mg: "Late Smt. Pushpa Malhotra & Late Shri Ramesh Malhotra",
  },
];
export const events = [
  {
    iconImage: "/icons/ring.png",
    name: "Sangeet & Engagement",
    when: "4 Dec • 07:00 PM",
    at: "Santanir, Contai",
    dress: "",
    desc: "The traditional engagement ceremony where families exchange sweets and rings.",
    start: "20261204T190000",
    end: "20261204T230000",
  },
  {
    iconImage: "/icons/haldi.png",
    name: "Haldi Ceremony",
    when: "5 Dec • 07:00 AM",
    at: "Dolphin Beach Resort, Mandarmoni",
    dress: "",
    desc: "The auspicious turmeric ceremony filled with music and family blessings.",
    start: "20261205T070000",
    end: "20261205T083000",
  },
  {
    iconImage: "/icons/mandap.png",
    name: "Shubh Vivah",
    when: "5 Dec • 06:00 PM",
    at: "Dolphin Beach Resort, Mandarmoni",
    dress: "",
    desc: "The main wedding ceremony as we take our seven vows in the presence of Agni.",
    start: "20261205T180000",
    end: "20261205T230000",
  },
  {
    iconImage: "/icons/dance.png",
    name: "Reception",
    when: "6 Dec • 06:00 PM",
    at: "Dolphin Beach Resort, Mandarmoni",
    dress: "",
    desc: "Join us for an evening of celebration & music as we celebrate the newlyweds.",
    start: "20261206T180000",
    end: "20261206T230000",
  },
];
const galleryFiles = [
  "14.jpg",
  "15.jpg",
  "1.jpg",
  "9.jpg",
  "6.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "7.jpg",
  "8.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
];
const galleryLabels = [
  "Eternity",
  "Magic",
  "Love",
  "Soulmate",
  "Magic",
  "Together",
  "Forever",
  "Bliss",
  "Cherish",
  "Bloom",
  "Harmony",
  "Promise",
  "Sunrise",
  "Dreams",
  "Embrace",
];
export const gallery = galleryFiles.map((file, index) => ({
  image: `/gallery/resized/${file}`,
  title: galleryLabels[index % galleryLabels.length],
}));
export const know = [
  [
    "Dress Code",
    "Royal Traditional / Ethnic wear (sarees, lehengas, kurtas & sherwanis).",
  ],
  ["Wedding Hashtag", "#Ankish — Please use this when posting photos!"],
  [
    "Kids Policy",
    "We love little ones! Children are welcome to celebrate all rituals.",
  ],
];
export const bank = [
  ["UPI ID", "adityaanaya@okaxis"],
  ["Account", "50100482938475"],
  ["Bank", "HDFC Bank"],
  ["Account Holder", "Aditya & Anaya"],
  ["IFSC", "HDFC0000104"],
];
export const wishes = [
  [
    "Wishing you both a lifetime of happiness, laughter, and endless adventure!",
    "Ramesh & Sunita K.",
  ],
  [
    "Congratulations! So excited to celebrate this magical milestone with you.",
    "Aria Sharma",
  ],
  [
    "Our blessings are always with you. May your beautiful new home be filled with peace, love, and harmony.",
    "Dada & Dadi",
  ],
];
