import Header from "../../components/FormFields/Header";
import Login from "../../components/LogIn/Login";

const LoginView = () => {
  return (
    <center>
      <div className="max-w-sm md:max-w-2xl p-4 mt-4 md:mt-8 md:p-10 bg-primary-focus rounded-2xl shadow-2xl">
        <Header
          heading="Welcome back"
          paragraph="Don't have an account yet? "
          linkName="Sign up"
          linkUrl="/signup"
        />{" "}
        <br />
        <Login />
      </div>
    </center>
  );
};

export default LoginView;
