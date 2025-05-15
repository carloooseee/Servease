import "../css/about.css"
import Footer from './Footer.jsx';
function About(){
    return(
    <>
            <div className="aboutUs">
                <div className="aboutUs1">
                <div className="aboutUs1-text">
                        <h2>Why Servease?</h2>
                        <p>
                            Servease was born from a simple idea — to make everyday services accessible with just a few taps. 
                            Whether it's booking a cleaning service, a ride, or help with errands, we aim to bridge the gap between 
                            need and convenience. Our platform brings together reliable providers and everyday people, so you can 
                            spend less time worrying and more time living.
                        </p>
                    </div>
                    <div className="aboutUs1-image">
                    <div className="accordion" id="accordionExample">
      {/* Our Mission */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            Our Mission
          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse show"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <strong>At Servease, we aim to simplify your daily life</strong> by
            providing easy access to reliable services at your fingertips. Our
            mission is to bridge the gap between service providers and those
            who need them, creating a smoother, more efficient experience for
            all.
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingTwo">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            Our Values
          </button>
        </h2>
        <div
          id="collapseTwo"
          className="accordion-collapse collapse"
          aria-labelledby="headingTwo"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <strong>Trust, transparency, and convenience</strong> are the
            foundation of Servease. We believe in empowering communities by
            making everyday services accessible, affordable, and dependable.
          </div>
        </div>
      </div>

      {/* Why Choose Servease */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingThree">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
            Why Choose Servease
          </button>
        </h2>
        <div
          id="collapseThree"
          className="accordion-collapse collapse"
          aria-labelledby="headingThree"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <strong>We're more than just a platform.</strong> Servease is built
            with real people and real needs in mind. Whether it's home cleaning,
            transport, or personal errands, we connect you with vetted
            professionals who care about quality and service.
          </div>
        </div>
      </div>
    </div>
                    </div>
                </div>
                <div className="aboutUs2">
                    <h2>Here at Servease....</h2>
                    <p>We believe convenience isn't a luxury — it's a right. <br />We're here to bring services to your doorstep, effortlessly.</p>
                </div>
                <div className="aboutUs3">
                    <div className="aboutUs3-image">
                        <img src="https://th.bing.com/th/id/OIP.eGp6TxrTkWkYEmulz069-QHaE8?cb=iwc1&w=1536&h=1024&rs=1&pid=ImgDetMain" alt="Servease Vision" />
                    </div>
                    <div className="aboutUs3-text">
                        <h2>Empowering Everyday Living</h2>
                        <p>
                            Servease isn’t just a tool — it’s a trusted companion for busy lives. Designed to simplify your day-to-day,
                            we connect you with the services you need when you need them most. Our platform exists to empower users,
                            providing a seamless way to access reliable service providers at fair prices. Whether it's a home cleaning,
                            a quick ride, or help with small tasks, Servease is built to serve your schedule, your way. We're creating
                            a world where access and ease go hand-in-hand, one booking at a time.
                        </p>
                    </div>
                </div>
                <Footer/>
            </div>
            </>

    );
}
export default About;