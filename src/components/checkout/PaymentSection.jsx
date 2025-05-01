import React, { useState, useEffect } from 'react';
import styles from './PaymentSection.module.css';
import api from '../../api';
import Spinner from '../ui/Spinner';
import { LuMicrowave } from "react-icons/lu";
import { ImPaypal } from "react-icons/im";

const PaymentSection = () => {
  const [cart_code, setCartCode] = useState(localStorage.getItem("cart_code") || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!cart_code) {
      setError("Aucun panier actif. Veuillez ajouter des articles.");
    }
  }, [cart_code]);

  // Fonction pour récupérer dynamiquement une valeur depuis un objet selon un chemin 'a.b.c'
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

          <button
            onClick={() => handlePayment('/initiate_paypal_payment/', 'approval_url')}
            className={`btn btn-primary w-100 mb-3 ${styles.paypalButton}`}
            disabled={!cart_code}
          >
            <ImPaypal /> Payer avec PayPal
          </button>

          <button
            onClick={() => handlePayment('/initiate_payment/', 'data.link')}
            className={`btn btn-warning w-100 mb-3 ${styles.flutterwaveButton}`}
            disabled={!cart_code}
          >
            <LuMicrowave /> Payer avec Flutterwave
          </button>

          <button
            onClick={() => handlePayment('/initiate_paydunya_payment/', 'data.payment_url')}
            className={`btn btn-success w-100 mb-3 ${styles.paydunyaButton}`}
            disabled={!cart_code}
          >
            <LuMicrowave /> Payer avec Wave (PayDunya)
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
