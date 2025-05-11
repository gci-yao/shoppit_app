import React, { useState, useEffect } from 'react';
import styles from './PaymentSection.module.css';
import api from '../../api';
import Spinner from '../ui/Spinner';
import { LuMicrowave } from "react-icons/lu";
import { ImPaypal } from "react-icons/im";
import waveQR from '../../assets/wave.jpg';
import { TfiLinux } from "react-icons/tfi";
import { toast } from 'react-toastify';
import omwave from '../../assets/om&wave.jpeg';

const PaymentSection = () => {
  const [cart_code, setCartCode] = useState(localStorage.getItem("cart_code") || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!cart_code) {
      setError("Aucun panier actif. Veuillez ajouter des articles.");
    }
  }, [cart_code]);

  const getValueByPath = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
  };

  const handlePayment = async (endpoint, responseKeyPath) => {
    if (!cart_code) {
      setError("Votre session a expiré. Veuillez recharger la page.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await api.post(endpoint, { cart_code });
      const redirectUrl = getValueByPath(res.data, responseKeyPath);

      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        throw new Error(res.data.error || "URL de paiement non reçue");
      }
    } catch (err) {
      console.error("Erreur de paiement:", err);
      setError(
        err.response?.data?.error ||
        err.message ||
        "Échec de la connexion au processeur de paiement"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner loading={loading} />;
  }

  return (
    <div className="col-md-4">
      <div className={`card ${styles.card}`}>
        <div className="card-header" style={{ backgroundColor: '#6050DC', color: 'white' }}>
          <h5>Options de Paiement</h5>
        </div>
        <div className="card-body">

          {error && (
            <div className="alert alert-danger">
              {error}
              {!cart_code && (
                <button
                  onClick={() => window.location.reload()}
                  className="btn btn-sm btn-link text-white"
                >
                  Recharger la page
                </button>
              )}
            </div>
          )}

          {/* SECTION WAVE + OM STYLÉE */}
          <div
            className="text-center mt-4 p-3 bg-info"

            style={{
              backgroundColor: '#FFA711',
              borderRadius: '15px',
              boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            }}
          >
            <h5 className="text-white mb-3">
              <LuMicrowave /> <strong>Payer via Wave ou Orange Money</strong>
            </h5>

            <div className="d-flex align-items-center justify-content-center mb-3">
              <img
                src={omwave}
                alt="OM & Wave"
                style={{
                  width: '100px',
                  height: '60px',
                  borderRadius: '5px',
                  marginRight: '10px',
                  objectFit: 'cover',
                  
                }}
              />
              <span className="text-white fs-5"><strong>+225 0706836722</strong></span>
            </div>

            <p
              className="text-secondary btn-sm mb-3"
              onClick={() => {
                navigator.clipboard.writeText('0706836722');
                toast.success("Numéro copié avec succès ! Collez-le dans votre compte wave ou OM pour effectuer le paiement !");
              }}
              style={{ cursor: "pointer", textDecoration: 'underline' }}
            >
              <TfiLinux /> Copier le numéro OM
            </p>

            <img
              src={waveQR}
              alt="QR Code Wave"
              style={{
                width: "260px",
                height: "285px",
                borderRadius: "10px",
                marginBottom: "10px",
                
              }}
            />

            <p className="text-white mt-2">
              <i className="fas fa-money-bill-wave"></i><a href="https://pay.wave.com/m/M_ci_rpkTnEMdLOa-/c/ci/"> Scanner le QR Code ou clickez ici !</a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
