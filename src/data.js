const u = id => `https://shaadiora.com/images/unsplash/${id}.jpg`
export const DATE = new Date('2026-11-04T00:00:00')
export const DATE_LABEL = 'November 4, 2026'
export const couple = { a: 'Anish', b: 'Ankita', venue: 'Dolphin Beach Resort, Mandarmoni', tag: '#AnkIsh' }
export const families = [
  { title: "Bride's Family", host: 'Mrs. Gopa Pradhan & Mr. Sibayan Pradhan',
    pg: 'Late Smt. Kamla Sharma & Late Shri Mohan Sharma', mg: 'Late Smt. Saroj Verma & Late Shri Gopal Verma' },
  { title: "Groom's Family", host: 'Mrs. Nipu Jana & Mr. Ansuman Jana',
    pg: 'Late Smt. Radha Kapoor & Late Shri Vijay Kapoor', mg: 'Late Smt. Pushpa Malhotra & Late Shri Ramesh Malhotra' },
]
export const events = [
  { icon: '💍', name: 'Sagai (Engagement)', when: '5 Nov • 11:00 AM', at: 'Royal Heritage Hall', dress: 'Traditional Indian Attire',
    desc: 'The traditional engagement ceremony where families exchange sweets and rings.', start: '20261105T110000', end: '20261105T130000' },
  { icon: '🪷', name: 'Haldi Ceremony', when: '5 Nov • 9:30 AM', at: 'Riverside Garden', dress: 'Yellow Ethnic Wear',
    desc: 'The auspicious turmeric ceremony filled with music and family blessings.', start: '20261105T093000', end: '20261105T110000' },
  { icon: '🌸', name: 'Shubh Vivah', when: '5 Nov • 12:15 PM', at: 'Grand Mandap', dress: 'Royal Traditional / Formal Ethnic',
    desc: 'The main wedding ceremony as we take our seven vows in the presence of Agni.', start: '20261105T121500', end: '20261105T160000' },
]
export const gallery = [
  ['photo-1610173827043-9db50e0d8ef9', 'Love'], ['photo-1774814329866-e790e6632c31', 'Joy'],
  ['photo-1727430256509-0f897d6f4765', 'Together'], ['photo-1634692843550-8ddff2a880ad', 'Forever'],
].map(([id, label]) => ({ src: u(id), label }))
export const know = [
  ['Dress Code', 'Royal Traditional / Ethnic wear (sarees, lehengas, kurtas & sherwanis).'],
  ['Wedding Hashtag', '#AdityaWedsAnaya — Please use this when posting photos!'],
  ['Kids Policy', 'We love little ones! Children are welcome to celebrate all rituals.'],
]
export const bank = [['UPI ID', 'adityaanaya@okaxis'], ['Account', '50100482938475'], ['Bank', 'HDFC Bank'],
  ['Account Holder', 'Aditya & Anaya'], ['IFSC', 'HDFC0000104']]
export const wishes = [
  ['Wishing you both a lifetime of happiness, laughter, and endless adventure!', 'Ramesh & Sunita K.'],
  ['Congratulations! So excited to celebrate this magical milestone with you.', 'Aria Sharma'],
  ['Our blessings are always with you. May your beautiful new home be filled with peace, love, and harmony.', 'Dada & Dadi'],
]
