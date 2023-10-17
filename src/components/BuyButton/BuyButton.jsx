import { CurrencyDollarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import "./BuyButton.css";
import { buyAddon } from "../../services/users.service";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import PropTypes from "prop-types";

const BuyButton = ({ addonName, priceOfAddon }) => {
  const [showBuyOptions, setShowBuyOptions] = useState(false);
  const [refreshEnabled, setRefreshEnabled] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [orderID, setOrderID] = useState("");
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    if (error) {
      toast.error("An error occured with your payment!");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  }, [success, error, orderID]);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: addonName,
            amount: {
              currency_code: "USD",
              value: priceOfAddon,
            },
          },
        ],
      })
      .then((idOfOrder) => {
        setOrderID(idOfOrder);
        return idOfOrder;
      })
      .catch((e) => {
        setError(`Error with order creation: ${e.message}`);
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      const { payer } = details;
      buyAddon(addonName, userData?.username);
      setRefreshEnabled(true);
      return payer;
    });
  };

  if (refreshEnabled) {
    window.location.reload();
  }

  return (
    <div className="flex justify-center flex-col items-center">
      {showBuyOptions === false ? (
        <button
          className={`btn btn-warning btn-sm h-2 fade-in`}
          onClick={() => setShowBuyOptions(true)}
        >
          {}
          <CurrencyDollarIcon className="mr-1 w-5 h-5" />
          <span className="text-md">{priceOfAddon}</span>
        </button>
      ) : (
        <div className="border border-base-300 bg-base-100 border-2 z-[1] p-3 rounded-xl fade-in paypal-button-container">
          <button
            type="button"
            className="indicator-item w-4 h-4 mb-2 border border-red-500 bg-red-400 rounded-full flex justify-center items-center hover:bg-white transition-colors"
            onClick={() => setShowBuyOptions(false)}
          >
            <XMarkIcon className={`w-3 h-3 fill-white`} />
          </button>
          {showBuyOptions ? (
            <PayPalButtons
              createOrder={createOrder}
              onApprove={onApprove}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};

BuyButton.propTypes = {
  addonName: PropTypes.string,
  priceOfAddon: PropTypes.string,
};

export default BuyButton;