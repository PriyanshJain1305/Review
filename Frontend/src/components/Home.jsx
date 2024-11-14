import React, { useState } from 'react';
import './hello.css';
import 'font-awesome/css/font-awesome.min.css';
import { FaEye, FaPlayCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FaPlus, FaMinus } from 'react-icons/fa';

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        {/* Add logo or other content here */}
      </div>
      <nav className="header-nav">
        <a href="#">Home</a>

        {/* Advertise with dropdown */}
        <div className="dropdown">
          <a href="#">Advertise</a>
          <div className="dropdown-content">
            <a href="#">Option 1</a>
            <a href="#">Option 2</a>
            <a href="#">Option 3</a>
            <a href="#">Option 4</a>
          </div>
        </div>

        {/* Supports with dropdown */}
        <div className="dropdown">
          <a href="#">Supports</a>
          <div className="dropdown-content">
            <a href="#">Option 1</a>
            <a href="#">Option 2</a>
            <a href="#">Option 3</a>
            <a href="#">Option 4</a>
          </div>
        </div>


        <a href="#">Contact</a>
      </nav>
      <button className="try-button">Try for Free</button>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <p className="trust-text">⭐ Trusted by over 4,322 students</p>
        <h1 className="hero-title">Learn Design with Nia Matos</h1>
        <p className="hero-description">
          Get your blood tests delivered at let home collect sample from the victory of the managements that supplies best design system guidelines ever.
        </p>
       <div className='search-container'>
       <input type="text" placeholder="Search Course Name" className="search-input" />
       <i className='fas fa-search-icon'></i>
       </div>
       <br></br>

        <div className="sponsors">
          <span>Sponsored by:</span>
          <img src="/images/78.png" alt="Paypal" style={{ width: '100px', height: "auto" }} />
          <img src="/images/8.png" alt="Google" style={{ width: '100px', height: "auto" }}/>
          <img src="/images/7.png" alt="Dropbox" style={{ width: '100px', height: "auto" }}/>
        </div>
      </div>
      <div className="hero-video">
        <video controls className="video-player" autoPlay muted loop>
          <source src="/video/4.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}

function TutorialCard({ title, rating, reviews, students, image }) {
  return (
    <div className="tutorial-card">
      <img src={image} alt={title} className="tutorial-image" />
      <div className="tutorial-info">
        <div className="rating">
          {'⭐'.repeat(Math.round(rating))} ({reviews} reviews)
        </div>
        <h3 className="tutorial-title">{title}</h3>
        <p className="students-count">
          <i className="fa fa-user" style={{marginRight: '8px'}}></i> {students} students watched</p>
      </div>
    </div>
  );
}

function TutorialsSection() {
  const tutorials = [
    {
      title: 'How to work with prototype design with adobe xd featuring tools',
      rating: 5.0,
      reviews: 392,
      students: 2388,
      image: '/images/1.jpg'
    },
    {
      title: 'Create multiple artwork by using figma prototyping tools development',
      rating: 4.5,
      reviews: 234,
      students: 3532,
      image: '/images/2.jpg'
    },
    {
      title: 'Convert your web layout theming easily with sketch zeplin extension',
      rating: 5.0,
      reviews: 282,
      students: 1037,
      image: '/images/3.jpg'
    }
  ];

  return (
    <section className="tutorials-section">
      <h2 className="section-title">Tutorials that people love most</h2>
      <div className="tutorials-list">
        {tutorials.map((tutorial, index) => (
          <TutorialCard key={index} {...tutorial} />
        ))}
      </div>
    </section>
  );
}

function StatsSection() {
    const stats = [
      { value: '80K+', description: 'We have more than students', color: '#FFA500' },
      { value: '150+', description: 'Free online tutorials videos available', color: '#FF5733' },
      { value: '90+', description: 'Daily updated blog post maintain', color: '#FF33FF' },
      { value: '& 3M', description: 'Job posted everydays with qualification', color: '#33AFFF' }
    ];
  
    return (
      <section className="stats-section">
        <div className="stats-box"></div>
        <div className="grid-container">
          {/* Stats Section */}
          <div className="stats-container">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card" style={{ borderColor: stat.color }}>
                <h2 style={{ color: stat.color }}>{stat.value}</h2>
                <p>{stat.description}</p>
              </div>
            ))}
          </div>
  
          {/* Text Section */}
          <div className="feature-text">
            <h3 className="feature-title">Core Features</h3>
            <h2>Smart Jackpots that you may love this anytime & anywhere</h2>
            <p>
              Get your tests delivered at let home collect sample from the victory of the managements that supplies best design system guidelines ever. Get your tests delivered at let home collect sample.
            </p>
            <button className="explore-button">Explore details</button>
          </div>
        </div>
      </section>
    );
  }
 // Course Card Component with icon to toggle feature visibility
function CourseCard({ title, description, rating, reviews, students, features, videoClasses, hours }) {
  // State to manage whether features are visible
  const [showFeatures, setShowFeatures] = useState(false);

  // Toggle the visibility of features
  const toggleFeatures = () => {
    setShowFeatures(prevState => !prevState);
  };

  return (
    <div className="course-card">
      <div className="video-icon">
        <FaPlayCircle size={40} color="#ff6b00" /> {/* Video play icon */}
      </div>
      <div className="course-info">
        <div className="rating">
          {'⭐'.repeat(Math.round(rating))} ({reviews} reviews)
        </div>
        <h3 className="course-title">{title}</h3>
        <div className="course-students">
          <FaEye size={16} style={{ marginRight: '5px' }} /> {/* Eye icon */}
          {students} students watched
        </div>
        <p className="course-description">{description}</p>

        <div className="course-details">
          {/* Icon to toggle features */}
          <div className="toggle-icon" onClick={toggleFeatures}>
            {showFeatures ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />}
          </div>

          {/* Show features list if visible */}
          <div className={`course-features ${showFeatures ? 'open' : ''}`}>
            {showFeatures && features.map((feature, index) => (
              <p key={index}>✔️ {feature}</p>
            ))}
          </div>

          <button className="course-button">Video Classes: {videoClasses}</button>
          <span className="course-duration">{hours} hrs</span>
        </div>
      </div>
    </div>
  );
}

// Popular Courses Section
function PopularCoursesSection() {
  const courses = [
    {
      title: 'Professional graphic design tutorial full course with exercise file',
      description: 'Get your tutorials delivered at home and collect sample from the victory of the managements.',
      rating: 5.0,
      reviews: 392,
      students: 2538,
      features: [
        'How to reduce file pixel dimensions without losing quality',
        'Create vector file from rasterize layer styles',
        'How to make logo pixel perfects with different extension',
        'Make color gradient with photoshop build-in tools',
      ],
      videoClasses: 7,
      hours: 4
    },
    {
      title: 'Become ultimate photoshop expert within 30 days',
      description: 'Get your tutorials delivered at home and collect sample from the victory of the managements.',
      rating: 5.0,
      reviews: 392,
      students: 2538,
      features: [
        'How to reduce file pixel dimensions without losing quality',
        'Create vector file from rasterize layer styles',
        'How to make logo pixel perfects with different extension',
        'Make color gradient with photoshop build-in tools',
      ],
      videoClasses: 7,
      hours: 4
    },
    {
      title: 'After effects animation tutorial with photoshop documents',
      description: 'Get your tutorials delivered at home and collect sample from the victory of the managements.',
      rating: 4.0,
      reviews: 392,
      students: 2538,
      features: [
        'How to reduce file pixel dimensions without losing quality',
        'Create vector file from rasterize layer styles',
        'How to make logo pixel perfects with different extension',
        'Make color gradient with photoshop build-in tools',
      ],
      videoClasses: 7,
      hours: 4
    },
    {
      title: 'Adobe illustrator vector art design mockup',
      description: 'Get your tutorials delivered at home and collect sample from the victory of the managements.',
      rating: 5.0,
      reviews: 392,
      students: 2538,
      features: [
        'How to reduce file pixel dimensions without losing quality',
        'Create vector file from rasterize layer styles',
        'How to make logo pixel perfects with different extension',
        'Make color gradient with photoshop build-in tools',
      ],
      videoClasses: 7,
      hours: 4
    }
  ];

  return (
    <section className="popular-courses-section">
      <h2 className="section-title">Popular Designing Course</h2>
      <div className="courses-list">
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </section>
  );
}

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: 'How to contact with riders emergency?',
      answer: 'An FAQ is a list of frequently asked questions (FAQs) and answers on a particular topic (also known as Questions and Answers [Q&A] or Frequently Asked Questions). The format is often used in articles, websites, email lists, and online forums where common questions tend to recur, for example through posts or queries by new users related to common knowledge gaps. The purpose of an FAQ is generally to provide information.',
    },
    {
      question: 'App installation failed, how to update system information?',
      answer: 'If you encounter an error during installation, check your system requirements and ensure you have the latest updates installed.',
    },
    {
      question: 'Website response taking time, how to improve?',
      answer: 'Improving website speed can involve optimizing images, minifying code, and using faster hosting solutions.',
    },
    {
      question: 'New update fixed all bugs and issues',
      answer: 'The latest update resolves known bugs and improves performance. Make sure to download the latest version for the best experience.',
    },
  ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <h2 className="faq-heading">FREQUENT QUESTION</h2>
      <h3 className="faq-subheading">Do you have any question?</h3>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <div
              className="faq-question"
              onClick={() => handleToggle(index)}
            >
              <span className="icon">
                {activeIndex === index ? <FaMinus /> : <FaPlus />}
              </span>
              {item.question}
            </div>
            {activeIndex === index && (
              <div className="faq-answer">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
  function App() {
    return (
      <div className="App">
        <Header />
        <HeroSection />
        <TutorialsSection />
        <StatsSection />  
        <PopularCoursesSection /> 
        <FAQ />
      </div>
    );
  }
export default App