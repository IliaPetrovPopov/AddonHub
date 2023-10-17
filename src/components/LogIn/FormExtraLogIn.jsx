const FormExtraLogIn = () => {
  return (
    <div className="flex max-w-lg justify-center ml-2 mr-2">
      {/* <div className="flex">
        <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          className="h-4 w-4 text-secondary rounded"
        />
        <label htmlFor="remember-me" className="ml-2 block text-sm">
          Smile for a great day
        </label>
      </div> */}

      <h5 className="flex">
        <a href="/reset-password" className="text-sm hover:text-accent">
          Forgot your password?
        </a>
      </h5>
    </div>
  );
};

export default FormExtraLogIn;
