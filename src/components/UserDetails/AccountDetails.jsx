import { accountFields } from "../../common/formFields";
import { useContext, useState } from "react";
import Input from "../FormFields/Input";
import AuthContext from "../../context/AuthContext";
import PropTypes from "prop-types";

const fields = accountFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

const AccountDetails = ({ onEdit }) => {
  const { userData } = useContext(AuthContext);
  const [detailsState, setDetailsState] = useState(fieldsState);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setDetailsState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    onEdit(id, value);
  };

  if (userData) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {fields.map((field) => (
          <div className="col-span-1 space-y-2 p-1" key={field.id}>
            <label htmlFor={field.labelFor}>{field.labelText}</label>
            <Input
              key={field.id}
              handleChange={handleChange}
              value={detailsState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={userData[field.id] || field.placeholder}
            />
          </div>
        ))}
        <div className="col-span-1 space-y-2 p-1">
          <label className="label p-0">Username</label>
          <input
            type="text"
            placeholder={userData.username || "Username"}
            className="input input-sm md:input-md  input-bordered outline text-black w-full "
            disabled
          />
        </div>
      </div>
    );
  }
};

AccountDetails.propTypes = {
  onEdit: PropTypes.func,
};

export default AccountDetails;
