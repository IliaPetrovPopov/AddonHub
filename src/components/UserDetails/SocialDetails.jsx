import { useContext, useState } from "react";
import Input from "../FormFields/Input";
import AuthContext from "../../context/AuthContext";
import PropTypes from "prop-types";
import { otherProfilesFields } from "../../common/formFields";

const fields = otherProfilesFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

const OtherDetails = ({ onEdit }) => {
  const { userData } = useContext(AuthContext);
  const [othersState, setOthersState] = useState(fieldsState);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setOthersState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    onEdit(id, value);
  };

  if (userData) {
    return (
      <div className="grid grid-cols-2 gap-4 w-full">
        {fields.map((field) => (
          <span
            className="flex col-span-1 gap-3 w-full items-center justify-center inline space-y-2"
            key={field.id}
          >
            <h3 className={field.icon}></h3>
            <Input
              key={field.id}
              handleChange={handleChange}
              value={othersState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={userData[field.id] || field.placeholder}
            />
          </span>
        ))}
      </div>
    );
  }
};

OtherDetails.propTypes = {
  onEdit: PropTypes.func,
};

export default OtherDetails;
