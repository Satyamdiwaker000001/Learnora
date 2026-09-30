export const mockOverview = {
  courses: [
    {
      _id: "c1",
      name: "React for Beginners",
      category: { name: "Frontend" },
      thumbnail_url: "/assets/images/photos/photo-profile-blue.svg"
    },
    {
      _id: "c2",
      name: "Node.js Essentials",
      category: { name: "Backend" },
      thumbnail_url: "/assets/images/photos/photo-profile-blue.svg"
    },
    {
      _id: "c3",
      name: "Database Design 101",
      category: { name: "Database" },
      thumbnail_url: "/assets/images/photos/photo-profile-blue.svg"
    }
  ],
  students: [
    {
      _id: "s1",
      name: "Naila",
      photo_url: "/assets/images/photos/photo-profile-blue.svg",
      courses: [{ name: "React for Beginners" }]
    },
    {
      _id: "s2",
      name: "Husnul",
      photo_url: "/assets/images/photos/photo-profile-blue.svg",
      courses: [{ name: "Node.js Essentials" }]
    },
    {
      _id: "s3",
      name: "Fikri",
      photo_url: "/assets/images/photos/photo-profile-blue.svg",
      courses: [{ name: "Database Design 101" }]
    },
    {
      _id: "s4",
      name: "Hufy",
      photo_url: "/assets/images/photos/photo-profile-blue.svg",
      courses: [{ name: "Frontend Fundamentals" }]
    }
  ]
};

export const mockStudents = [
  {
    _id: "s1",
    name: "Naila",
    photo_url: "/assets/images/photos/photo-profile-blue.svg",
    courses: [{ name: "React for Beginners" }]
  },
  {
    _id: "s2",
    name: "Husnul",
    photo_url: "/assets/images/photos/photo-profile-blue.svg",
    courses: [{ name: "Node.js Essentials" }]
  },
  {
    _id: "s3",
    name: "Fikri",
    photo_url: "/assets/images/photos/photo-profile-blue.svg",
    courses: [{ name: "Database Design 101" }]
  },
  {
    _id: "s4",
    name: "Hufy",
    photo_url: "/assets/images/photos/photo-profile-blue.svg",
    courses: [{ name: "Frontend Fundamentals" }]
  }
];

export const mockCourses = [
  {
    _id: "c1",
    name: "React for Beginners",
    tagline: "Learn React the easy way",
    description: "A complete introduction to React for building modern UIs.",
    thumbnail_url: "/assets/images/thumbnails/th-blue.png",
    category: { name: "Frontend" },
    students: [
      { _id: "s1", name: "Naila", photo_url: "/assets/images/photos/photo-profile-blue.svg" },
      { _id: "s2", name: "Husnul", photo_url: "/assets/images/photos/photo-profile-blue.svg" }
    ]
  },
  {
    _id: "c2",
    name: "Node.js Essentials",
    tagline: "Backend for modern web",
    description: "Learn server-side JavaScript with Node.js and Express.",
    thumbnail_url: "/assets/images/thumbnails/th-blue.png",
    category: { name: "Backend" },
    students: [{ _id: "s3", name: "Fikri", photo_url: "/assets/images/photos/photo-profile-blue.svg" }]
  },
  {
    _id: "c3",
    name: "Database Design 101",
    tagline: "Master data structuring",
    description: "Understand database normalization, relationships, and SQL basics.",
    thumbnail_url: "/assets/images/thumbnails/th-blue.png",
    category: { name: "Database" },
    students: [
      { _id: "s4", name: "Hufy", photo_url: "/assets/images/photos/photo-profile-blue.svg" },
      { _id: "s1", name: "Naila", photo_url: "/assets/images/photos/photo-profile-blue.svg" }
    ]
  },
  {
    _id: "c4",
    name: "DevOps Foundations",
    tagline: "CI/CD and modern deployment",
    description: "Learn continuous integration, Docker, and modern deployment pipelines.",
    thumbnail_url: "/assets/images/thumbnails/th-blue.png",
    category: { name: "DevOps" },
    students: [{ _id: "s2", name: "Husnul", photo_url: "/assets/images/photos/photo-profile-blue.svg" }]
  },
  {
    _id: "c5",
    name: "UI/UX Design Basics",
    tagline: "Design beautiful user experiences",
    description: "Learn the principles of user interface and user experience design.",
    thumbnail_url: "/assets/images/thumbnails/th-blue.png",
    category: { name: "Design" },
    students: [
      { _id: "s3", name: "Fikri", photo_url: "/assets/images/photos/photo-profile-blue.svg" },
      { _id: "s4", name: "Hufy", photo_url: "/assets/images/photos/photo-profile-blue.svg" }
    ]
  },
  {
    _id: "c6",
    name: "Python for Data Analysis",
    tagline: "Analyze data with Python",
    description: "Explore Python libraries for data manipulation, visualization, and analysis.",
    thumbnail_url: "/assets/images/thumbnails/th-blue.png",
    category: { name: "Data Science" },
    students: [
      { _id: "s1", name: "Naila", photo_url: "/assets/images/photos/photo-profile-blue.svg" },
      { _id: "s2", name: "Husnul", photo_url: "/assets/images/photos/photo-profile-blue.svg" }
    ]
  }
];

export const mockCourseDetails = {
  _id: "c1",
  name: "React for Beginners",
  category: { name: "Frontend" },
  thumbnail_url: "/assets/images/photos/photo-profile-blue.svg",
  details: [
    {
      _id: "ct1",
      title: "Introduction to React",
      type: "video",
      youtubeId: "dQw4w9WgXcQ"
    },
    {
      _id: "ct2",
      title: "JSX and Components",
      type: "text",
      text: "<p>JSX is a syntax extension for JavaScript...</p>"
    }
  ],
  students: [
    { _id: "s1", name: "Naila", photo_url: "/assets/images/photos/photo-profile-blue.svg" },
    { _id: "s2", name: "Husnul", photo_url: "/assets/images/photos/photo-profile-blue.svg" }
  ]
};

export const mockManagerSession = {
  name: "Admin Manager",
  role: "manager",
  email: "manager@example.com"
};

export const mockStudentSession = {
  name: "Husnul",
  role: "student",
  email: "husnul@example.com",
  photo_url: "/assets/images/photos/photo-profile-blue.svg"
};
