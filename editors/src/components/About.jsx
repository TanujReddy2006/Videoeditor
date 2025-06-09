import React from 'react';
import './About.css';

function About() {
  return (
    <div id='mainab'>
      <div id='ab1'>
        <h1>About Us</h1>
      </div>

      <div id='ab3'>

        <div id='ab2'>
          <div id='content1'>
            <p>
              <strong>EditPro</strong> is a bridge between creators and professional editors. From manuscripts to marketing content,
              we ensure your writing reaches its highest potential through expert editing services.
            </p>
            <p>
              Our editors specialize in various fields—academic, business, technical, creative writing, and more—ensuring tailored editing
              that fits your needs perfectly.
            </p>
            <p>
              We believe in clarity, precision, and fast delivery. At EditPro, quality is not optional—it’s our core.
            </p>
          </div>
          <div id='image1'>
            <img
                src="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg"
                alt="Editor working at desk"
            />
          </div>
        </div>

        <div id='ab2'>
          <div id='image1'>
            <img
  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
  alt="Client meeting editor online"
/>

          </div>
          <div id='content1'>
            <p>
              Using EditPro is simple and effective. Browse through a curated list of editors, check their expertise and availability, and send your request.
            </p>
            <p>
              Once approved, you can communicate securely, share files, track revisions, and finalize your work—all in one seamless experience.
            </p>
            <p>
              Whether you’re on a deadline or need a detailed polish, our system ensures smooth collaboration from start to finish.
            </p>
            <p><em>Start connecting and make your words count.</em></p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default About;
