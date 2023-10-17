import { sendPasswordResetEmail } from "@firebase/auth";
import { useState } from "react";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router";
import Header from "../FormFields/Header";
import Input from "../FormFields/Input";

export const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [wrongEmail, setWrongEmail] = useState(false);
  const [sentSuccessful, setSentSuccessful] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setSentSuccessful(true);
    } catch (error) {
      setWrongEmail(true);
      throw new Error(`Error occured: ${error.message}`);
    } finally {
      if (sentSuccessful) {
        setTimeout(() => {
          setSentSuccessful(false);
          navigate("/");
        }, 2700);
      } else {
        setTimeout(() => {
          setWrongEmail(false);
        }, 3000);
      }
    }
  };

  return (
    <center>
      <div className="max-w-sm md:max-w-2xl p-4 mt-4 md:mt-8 md:p-10 bg-primary-focus rounded-2xl shadow-2xl">
        <Header heading="Reset your password" />
        <Input
          type="text"
          placeholder="Enter your email..."
          handleChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="btn btn-neutral"
          onClick={handleSubmit}
        >
          Send
        </button>

        {sentSuccessful && (
          <div className="alert alert-success mt-2" role="alert">
            <strong>Reset link sent successfully.</strong> Please check your
            email!
          </div>
        )}

        {wrongEmail && (
          <div className="alert alert-error mt-2" role="alert">
            <strong>Wrong email!</strong> Please enter a valid one!
          </div>
        )}
      </div>
    </center>
  );
};
