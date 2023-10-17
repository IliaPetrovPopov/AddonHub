import { useState } from "react";
import { reauthFields } from "../../common/formFields";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
} from "@firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import FormAction from "../FormFields/FormAction";
import Input from "../FormFields/Input";
import { authErrorMessages } from "../../common/error.messages";

const fields = reauthFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

const Reauthenticate = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [reauthState, setReauthState] = useState(fieldsState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setReauthState({ ...reauthState, [e.target.id]: e.target.value });
  };

  const onReauth = async (e) => {
    e.preventDefault();
    try {
      const passwordCredential = EmailAuthProvider.credential(
        user.email,
        reauthState["password"]
      );
      // eslint-disable-next-line no-unused-vars
      await reauthenticateWithCredential(user, passwordCredential);

      navigate("/settings");
    } catch (e) {
      toast.error(authErrorMessages.wrongPass);
    }
  };
  return (
    <form className="mt-8 space-y-6">
      <div className="space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={reauthState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>
      <FormAction handleSubmit={onReauth} type="Link" text="Confirm" />
    </form>
  );
};

export default Reauthenticate;
