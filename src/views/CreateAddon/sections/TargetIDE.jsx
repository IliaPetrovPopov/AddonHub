import PropTypes from "prop-types";
import { IDEs } from "../../../common/constants";

const TargetIDE = ({ form, handleChange }) => {
  return (
    <div>
      <h5 className="font-semibold opacity-85 md:text-md">
        <i className="bi bi-pencil-square"></i> Target IDE
        <span className="text-error"> * </span>
      <span
        className="tooltip tooltip-right tooltip-info"
        data-tip="On which IDE the addon will be used - only 1 allowed"
        >
        <i className="bi bi-info-circle icon-on-section"></i>
      </span>
        </h5>
      <select
        className="select select-sm md:select-md w-full mt-2 md:mt-4"
        onChange={handleChange("targetIDE")}
        value={form.targetIDE === "" ? "Select IDE" : form.targetIDE}
      >
        <option disabled selected>
          Select IDE
        </option>
        {IDEs.map((i) => (
          <option key={i}>{i}</option>
        ))}
      </select>

    </div>
  );
};

TargetIDE.propTypes = {
  form: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default TargetIDE;
