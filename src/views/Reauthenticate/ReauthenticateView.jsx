import Header from "../../components/FormFields/Header";
import Reauthenticate from "../../components/Reauthenticate/Reauthenticate";

const ReauthenticateView = () => {
  return (
    <center className="w-screen">
      <div className="max-w-sm md:max-w-2xl p-4 mt-4 md:mt-8 md:p-10 bg-primary-focus rounded-2xl shadow-2xl">
        <Header
          heading="Confirm it is you"
          paragraph="This is done for security measures"
        />{" "}
        <Reauthenticate />
      </div>
    </center>
  );
};
export default ReauthenticateView;
