import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";

const Price = ({ form, handleChange }) => {
  const handlePriceChange = (value) => {
    handleChange("price")(value.replace(/[^0-9.]/g, ""));
  };

  return (
    <div className="mt-2 md:mt-0">
      {" "}
      <h5 className="font-semibold opacity-85 md:text-md">
        <i className="bi bi-pencil-square"></i>
        <span className="info-wrapper">
          {" "}
          Price
          <span
            className="tooltip tooltip-right tooltip-info"
            data-tip="Price of the addon you want to upload (optional)"
          >
            <i
              className="bi bi-info-circle icon-on-section"
              id="info-icon-in-logo-section"
            ></i>
          </span>
        </span>{" "}
      </h5>
      <div>
        <NumericFormat
          placeholder="Enter price... (optional)"
          className="input input-bordered input-sm md:input-md w-full mt-2 md:mt-4"
          prefix="$"
          value={form.price}
          onValueChange={(values) => handlePriceChange(values.value)}
          decimalSeparator="."
          decimalScale={2}
          inputMode="decimal"
          allowNegative={false}
          allowLeadingZeros={false}
        />
      </div>
    </div>
  );
};

Price.propTypes = {
  form: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Price;
