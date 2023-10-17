import Header from "../../components/FormFields/Header";
import SignUp from "../../components/SignUp/SignUp";

const SignUpView = () => {
  return (
    <center>
      <div className="max-w-sm md:max-w-2xl p-4 mt-4 md:mt-8 md:p-10 bg-secondary-focus rounded-2xl shadow-2xl">
        <Header
          heading="Sign up"
          paragraph="Already a user? "
          linkName="Log in"
          linkUrl="/login"
        />{" "}
        <br />
        <SignUp />
      </div>
    </center>
  );
};

export default SignUpView;
