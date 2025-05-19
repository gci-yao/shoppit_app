import React from 'react';
import video from '../../assets/bafa.mp4'; // adapte le chemin si nécessaire
import image from "../../assets/shoppit.png"


const Header = () => {
  return (
    <header className="py-5 position-relative" style={{ backgroundColor: '#6050DC', overflow: 'hidden' }}>
      {/* Vidéo d’arrière-plan */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ objectFit: 'cover', zIndex: 0, opacity: 0.25 }}
      >
        <source src={video} type="video/mp4" />
        Votre navigateur ne supporte pas la vidéo HTML5.
      </video>

      {/* Contenu en deux colonnes */}
      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="row align-items-center">
          {/* Texte à gauche */}
          <div className="col-md-6 text-white text-center text-md-start mb-5 mb-md-0">
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

          {/* Maquette téléphone style iPhone 16 à droite */}
          <div className="col-md-6 d-flex justify-content-center">
            <div
              className="position-relative bg-dark shadow-lg"
              style={{
                width: '240px',
                height: '490px',
                borderRadius: '56px',
                border: '4px solid #222',
                boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
                overflow: 'hidden',
                backgroundColor: '#000',
              }}
            >
              {/* Dynamic Island (encoche iPhone 16) */}
              <div
                className="position-absolute bg-dark rounded-pill"
                style={{
                  width: '120px',
                  height: '20px',
                  top: '27px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 2,
                  border: '1px solid #333',
                }}
              ></div>

              {/* Écran de la maquette */}
              <video
                autoPlay
                muted
                loop
                playsInline
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                  objectFit: '',
                  zIndex: 1,
                }}
              >
                <source src={video} type="video/mp4" />
                Votre navigateur ne supporte pas la vidéo HTML5.
              </video>
              {/* <img
                src={image}
                alt="Maquette"
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
