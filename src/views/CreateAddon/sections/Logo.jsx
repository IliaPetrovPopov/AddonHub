import PropTypes from "prop-types";
import { DropZone } from "../../../components/DragNDrop/DropZone";

const Logo = ({ image, setImage, rejectedImages, setRejectedImages }) => {
  return (
    <div>
      {" "}
      <h5 className="font-semibold opacity-85 md:text-md">
        <i className="bi bi-pencil-square"></i>
        <span className="info-wrapper">
          {" "}
          Logo
          <span
            className="tooltip tooltip-right tooltip-info"
            data-tip="Logo of the addon you want to upload (optional)"
          >
            <i
              className="bi bi-info-circle icon-on-section"
              id="info-icon-in-logo-section"
            ></i>
          </span>
        </span>{" "}
      </h5>

        <DropZone
          className={"p-12 m-1 border border-base-500"}
          files={image}
          setFiles={setImage}
          rejectedFiles={rejectedImages}
          setRejectedFiles={setRejectedImages}
        />
    </div>
  );
};

Logo.propTypes = {
  image: PropTypes.array.isRequired,
  setImage: PropTypes.func.isRequired,
  rejectedImages: PropTypes.array.isRequired,
  setRejectedImages: PropTypes.func.isRequired,
};

export default Logo;
