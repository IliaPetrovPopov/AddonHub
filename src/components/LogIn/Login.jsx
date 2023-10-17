import { useContext, useState } from "react";
import Input from "../FormFields/Input";
import { loginFields } from "../../common/formFields";
import FormAction from "../FormFields/FormAction";
import AuthContext from "../../context/AuthContext";
import { loginUser } from "../../services/auth.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FormExtraLogIn from "./FormExtraLogIn";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

const Login = () => {
  const { setContext } = useContext(AuthContext);
  const [loginState, setLoginState] = useState(fieldsState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const credential = await loginUser(
        loginState["email-address"],
        loginState["password"]
      );

      setContext({
        user: credential.user,
      });
      navigate("/");
      // window.location.reload();
    } catch (e) {
      toast.error("Email and password do not match!");
    }
  };

  return (
    <form className="mt-8 space-y-6">
      <div className="space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
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
      <FormExtraLogIn />
      <FormAction handleSubmit={onLogin} text="Login" />
    </form>
  );
};

export default Login;
