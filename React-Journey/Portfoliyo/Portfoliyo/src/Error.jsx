import React from 'react'
import { Link } from 'react-router-dom'
import "./Error.css"
const Error = () => {
  return (
    <body>
      <section class="error-page">
        <div class="error-container">
          <h1 class="error-code">404</h1>
          <h2>Page Not Found</h2>
          <p>
            Oops! The page you are looking for doesn't exist or has been moved.
          </p>
          <a href="/" class="home-btn">
            Back to Home
          </a>
        </div>
      </section>
    </body>
  );
}

export default Error
