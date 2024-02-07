import React from 'react';
import './Test.css'; // Import the CSS file for styling
import testimonialData from './Data'; // Import your data or use inline data

const Testimonials = () => {
  return (
    <div className="testimonials-container">
      {testimonialData.map((testimonial, index) => (
        <div key={index} className="testimonial">
          <img src={testimonial.image} alt={`User ${index + 1}`} className="testimonial-image" />
          <p className="testimonial-text">{testimonial.text}</p>
        </div>
      ))}
    </div>
  );
}

export default Testimonials;
