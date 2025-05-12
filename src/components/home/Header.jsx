import React from 'react';
import video from '../../assets/bafa.mp4'; // adapte le chemin si nécessaire

const Header = () => {
  return (
    <header className="py-5 position-relative" style={{ backgroundColor: '#6050DC', overflow: 'hidden' }}>
      {/* Vidéo d’arrière-plan dans la zone visible uniquement */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ objectFit: 'cover', zIndex: 0, height: '100%', opacity: 0.25 }}
      >
        <source src={video} type="video/mp4" />
        Votre navigateur ne supporte pas la vidéo HTML5.
      </video>

      {/* Contenu centré avec z-index plus élevé */}
      <div className="container px-4 px-lg-5 py-5 position-relative" style={{ zIndex: 1 }}>
        <div className="text-center text-white">
          <h1 className="display-4 fw-bold">
            Welcome to your Favorite Store with our collection from 2025
          </h1>
          <p className="lead fw-normal text-white-75 mb-4">
            Discover the latest trends with our store
          </p>
          <a href="#shop" className="btn btn-light btn-lg rounded-pill px-4 py-2">
            Shop Now
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
