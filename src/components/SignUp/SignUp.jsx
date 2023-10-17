import { useContext, useState } from "react";
import { signUpFileds } from "../../common/formFields";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router";
import Input from "../FormFields/Input";
import FormAction from "../FormFields/FormAction";
import FormExtraSignUp from "./FormExtraSignUp";
import {
  emailValidAndNotTaken,
  phoneValidAndNotTaken,
  usernameValidAndNotTaken,
} from "../../common/helperFunctions/userValidations";
import { createUserByUsername } from "../../services/users.service";
import { registerUser } from "../../services/auth.service";
import { toast } from "react-toastify";

const fields = signUpFileds;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

const SignUp = () => {
  const { setContext } = useContext(AuthContext);
  const [signUpState, setSignUpState] = useState(fieldsState);
  const [isChecked, setIsChecked] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSignUpState({ ...signUpState, [e.target.id]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    setCanSubmit(e.target.checked);
  };

  const onSignUp = async (e) => {
    e.preventDefault();

    if (!canSubmit) {
      toast.warn("Please agree to the Terms and Conditions.");
      return;
    }

    const email = signUpState["email-address"];
    const username = signUpState["username"];
    const phoneNumber = signUpState["phone"];
    const password = signUpState["password"];
    const confirmPassword = signUpState["confirm-password"];

    if (password !== confirmPassword) {
      return (
        <div className="alert alert-warning" role="alert">
          <strong>Passwords do not match!</strong>
        </div>
      );
    }

    try {
      await emailValidAndNotTaken(email, "");
      await usernameValidAndNotTaken(username);
      await phoneValidAndNotTaken(phoneNumber, "");

      const credential = await registerUser(email, password);
      await createUserByUsername(
        username,
        credential.user.uid,
        email,
        phoneNumber
      );
      setContext({ user: credential.user });
      navigate("/settings");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form className="mt-8 space-y-6">
      <div className="space-y-5">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signUpState[field.id]}
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
      <FormExtraSignUp
        isChecked={isChecked}
        handleCheckboxChange={handleCheckboxChange}
      />
      <FormAction handleSubmit={onSignUp} text="Sign Up" />
    </form>
  );
};

export default SignUp;
