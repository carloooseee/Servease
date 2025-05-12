import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/home.css';
import homeCleaningImage from '../images/home_cleaning.jpg';
import carCleaningImage from '../images/car_cleaning.jpg';
import houseRepairsImage from '../images/house_repairs.jpg';
import Footer from './Footer.jsx';

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
    }, 3000); 
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
          ServEase is the ultimate platform for connecting you with reliable, professional home service providers—right when you need them. Whether it's a last-minute cleaning, expert car detailing, pet grooming, or a range of other household tasks, ServEase makes it easy to get the job done without the stress.

Created with busy individuals in mind, ServEase offers flexible scheduling, transparent pricing, and a secure, user-friendly booking process. Say goodbye to the hassle of searching for trustworthy help—ServEase puts convenience, quality, and reliability at your fingertips.
          </p>
          <div className="cover-buttons">
            <button className="btn button1" onClick={() => navigate('/services')}>Book Now</button>
            <button className="btn button2" onClick={() => navigate('/become')}>Be a Helper</button>
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
      <div id="carouselExampleCaptions" className="carousel slide custom-carousel" data-bs-ride="carousel"> 
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={homeCleaningImage} className="d-block w-100 carousel-image" alt="..." />
      <div className="carousel-caption d-none d-md-block">
        <h5>First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src={homeCleaningImage} className="d-block w-100 carousel-image" alt="..." />
      <div className="carousel-caption d-none d-md-block">
        <h5>Second slide label</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src={homeCleaningImage} className="d-block w-100 carousel-image" alt="..." />
      <div className="carousel-caption d-none d-md-block">
        <h5>Third slide label</h5>
        <p>Some representative placeholder content for the third slide.</p>
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>


      {/* Fifth section: Why choose us */}
      <section className="choose-us-page">
        <h2 className="choose-us-title">Why choose us</h2>
        <div className="choose-us-content">
          <div className="choose-us-image-container">
            <img src="https://th.bing.com/th/id/OIP.62MKXOoBgflUJdeB07JeLgHaE8?cb=iwc2&rs=1&pid=ImgDetMain" alt="Why choose us" className="choose-us-image" />
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
      <Footer/>
    </main>
  );
};

export default Home;
