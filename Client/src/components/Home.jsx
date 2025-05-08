import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/home.css';
import homeCleaningImage from '../images/home_cleaning.jpg';
import carCleaningImage from '../images/car_cleaning.jpg';
import houseRepairsImage from '../images/house_repairs.jpg';

const helpers = [
  {
    image: homeCleaningImage,
    title: 'Home Cleaning',
    description: 'Professional and thorough cleaning for your home to keep it fresh and spotless.',
  },
  {
    image: carCleaningImage,
    title: 'Car Cleaning',
    description: 'Complete car detailing and cleaning services to make your vehicle shine.',
  },
  {
    image: houseRepairsImage,
    title: 'House Repairs',
    description: 'Reliable repair services for plumbing, electrical, and general household fixes.',
  },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const servicesTitleRef = useRef(null);
  const [animateTitle, setAnimateTitle] = useState(false);

  const serviceCardRefs = useRef([]);
  const [animateCards, setAnimateCards] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % helpers.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateTitle(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (servicesTitleRef.current) {
      observer.observe(servicesTitleRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    serviceCardRefs.current = serviceCardRefs.current.slice(0, helpers.length);
    console.log('Service card refs:', serviceCardRefs.current);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = serviceCardRefs.current.indexOf(entry.target);
            console.log(`Animating service card at index: ${index}`);
            if (index !== -1) {
              setAnimateCards((prev) => {
                const newAnimate = [...prev];
                newAnimate[index] = entry.isIntersecting;
                return newAnimate;
              });
              // observer.unobserve(entry.target); // Removed to keep observing
            }
          }
        });
      },
      { threshold: 0.1 }
    );
    serviceCardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, []);

  const handleIndicatorClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <main className="home-container">
      {/* First and second sections remain unchanged */}
      <section className="cover-page">
        <div className="cover-overlay">
          <h1 className="cover-title">SERVEASE</h1>

          <p className="cover-description">
            ServEase is your all-in-one platform for finding trusted at-home
          </p>
          <p className="cover-description">
            service providers in the Philippines. Whether you need urgent cleaning,
          </p>
          <p className="cover-description">
            car detailing, pet grooming, or other household services,
          </p>
          <p className="cover-description">
            ServEase connects you with skilled professionals at your convenience.
          </p>
          <p className="cover-description">
            Designed for busy individuals, ServEase offers flexible scheduling,
          </p>
          <p className='cover-description'>
            transparent pricing, and a secure booking process
          </p>
          <p className='cover-description'>
            making home service hassle-free, fast, and reliable.
          </p>
          <div className="cover-buttons">
            <button className="btn btn-primary cover-btn" onClick={() => navigate('/services')}>Book Now</button>
            <button className="btn btn-secondary cover-btn" onClick={() => navigate('/become')}>Be a Helper</button>
          </div>
        </div>
      </section>

      <section className="services-page">
        <h2 className={`services-title ${animateTitle ? 'animate' : ''}`} ref={servicesTitleRef}>SERVICES</h2>
        <div className="services-images">
          {helpers.map((helper, index) => (
            <div
              key={index}
              className={`service-card ${animateCards[index] ? 'animate-card' : ''}`}
              ref={(el) => (serviceCardRefs.current[index] = el)}
            >
              <div className="service-item">
                <img src={helper.image} alt={helper.title} />
                <h3>{helper.title}</h3>
                <p className="service-description">{helper.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="services-book-btn-container">
          <button className="btn btn-primary services-book-btn" onClick={() => navigate('/services')}>BOOK NOW</button>
        </div>
      </section>

      {/* Third section: What our customers think */}
      <section className="reviews-page">
        <div className="reviews-left">
          <h3 className="reviews-title">What our customers think...</h3>
          <p className="reviews-description">
            We value our customers' feedback and strive to provide the best service possible. Here are some of the reviews and ratings from our satisfied clients.
          </p>
        </div>
        <div className="reviews-right">
          <div className="reviews-right-left">
            <div className="review-box">
              <p>"Excellent service, very professional and reliable."</p>
              <p>Rating: ★★★★★</p>
            </div>
            <div className="review-box">
              <p>"Quick response and great quality work."</p>
              <p>Rating: ★★★★☆</p>
            </div>
          </div>
          <div className="reviews-right-right">
            <div className="review-box">
              <p>"Highly recommend Servease for all your service needs."</p>
              <p>Rating: ★★★★★</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fourth section: What our helpers say */}
      <section className="helpers-page">
        <h3 className="helpers-title">What our helpers say...</h3>
        <div className="helpers-carousel-container" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <button
              className="carousel-btn left"
              aria-label="Previous helper"
              onClick={() => setCurrentSlide((currentSlide - 1 + helpers.length) % helpers.length)}
              style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }}
            >
              {'<'}
            </button>
            <div className="helpers-carousel" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div
                className="carousel-content"
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', transition: 'transform 0.5s ease-in-out' }}
              >
                <img src={helpers[currentSlide].image} alt={`Helper ${currentSlide + 1}`} className="carousel-image" />
                <div className="carousel-description" style={{ flex: 1, overflowY: 'auto', height: '550px', position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <p>{helpers[currentSlide].description}</p>
                </div>
              </div>
            </div>
            <button
              className="carousel-btn right"
              aria-label="Next helper"
              onClick={() => setCurrentSlide((currentSlide + 1) % helpers.length)}
              style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' }}
            >
              {'>'}
            </button>
          </div>
          <div className="helpers-carousel-indicators" role="tablist" aria-label="Helper testimonials" style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
            {helpers.map((_, index) => (
              <div
                key={index}
                role="tab"
                tabIndex={0}
                aria-selected={index === currentSlide}
                aria-controls={`helper-panel-${index}`}
                id={`helper-tab-${index}`}
                className={`helpers-carousel-indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => handleIndicatorClick(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleIndicatorClick(index);
                  }
                }}
              />
            ))}
          </div>
          <button className="btn btn-primary" style={{ marginTop: '20px', alignSelf: 'center' }}>Be a Helper</button>
        </div>
      </section>

      {/* Fifth section: Why choose us */}
      <section className="choose-us-page">
        <h2 className="choose-us-title">Why choose us</h2>
        <div className="choose-us-content">
          <div className="choose-us-image-container">
            <img src="https://via.placeholder.com/400x300" alt="Why choose us" className="choose-us-image" />
          </div>
          <div className="choose-us-contacts">
            <div className="contact-section">
              <h3>
                <svg className="contact-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.36 11.36 0 003.55.57 1 1 0 011 1v3.61a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1h3.61a1 1 0 011 1 11.36 11.36 0 00.57 3.55 1 1 0 01-.21 1.11z"/>
                </svg>
                Phone
              </h3>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="contact-section">
              <h3>
                <svg className="contact-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2l-8 5-8-5V6l8 5 8-5v.01z"/>
                </svg>
                Email
              </h3>
              <p>contact@servease.com</p>
            </div>
            <div className="contact-section">
              <h3>
                <svg className="contact-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/>
                </svg>
                Address
              </h3>
              <p>123 Servease St, City, Country</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
