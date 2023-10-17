import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { personalDetailsFields } from "../../common/formFields";
import Input from "../FormFields/Input";
import { formattedMaxDate, formattedMinDate } from "../../common/constants";
import PropTypes from "prop-types";

const fields = personalDetailsFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

const PersonalDetails = ({ onEdit }) => {
  const { userData } = useContext(AuthContext);
  const [personalState, setPersonalState] = useState(fieldsState);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setPersonalState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    onEdit(id, value);
  };

  if (userData) {
    return (
      <div className="grid grid-cols-2 gap-3 w-full mt-3 ml-auto mr-auto space-y-3 overflow">
        <div className="col-span-2 row-span-2 max-w-l"></div>
        {fields.map((field) => (
          <div className="col-span-1 space-y-2 p-1" key={field.id}>
            <label htmlFor={field.labelFor}>{field.labelText}</label>
            <Input
              key={field.id}
              handleChange={handleChange}
              value={personalState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={
                userData[field.id] ? userData[field.id] : field.placeholder
              }
              max={formattedMaxDate}
              min={formattedMinDate}
            />
          </div>
        ))}
        <div className="col-span-2">
          <label className="label ">Bio</label>
          <textarea
            className="textarea textarea-bordered w-full"
            id="bio"
            placeholder={
              userData.bio
                ? userData.bio
                : "What do you want us to know about you"
            }
            value={personalState.bio}
            onChange={handleChange}
          ></textarea>
          <label className="label-text ">
            We are not a dating app but you can still meet interesting people
          </label>
        </div>
      </div>
    );
  }
};

PersonalDetails.propTypes = {
  onEdit: PropTypes.func,
};

export default PersonalDetails;
