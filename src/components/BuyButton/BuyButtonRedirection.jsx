import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const BuyButtonRedirection = ({ addonPrice, addonID }) => {
    const navigate = useNavigate()
  return (
    <button
      className={`btn bg-yellow-400 btn-sm h-2 hover:bg-yellow-200 fade-in`}
      onClick={(() => navigate(`/addons/${addonID}`))}
    >
      {}
      <CurrencyDollarIcon className="mr-1 w-5 h-5" />
      <span className="text-md">{addonPrice}</span>
    </button>
  );
};

BuyButtonRedirection.propTypes = {
  addonPrice: PropTypes.string,
  addonID: PropTypes.string,
};

export default BuyButtonRedirection;