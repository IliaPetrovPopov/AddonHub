import { useNavigate } from "react-router";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="footer text-lg shadow p-4 mt-4  border-y-2 border-y-primary">
      <div className="w-full mx-auto p-4 flex md:flex-row justify-between">
        <span className="text-sm sm:text-md">
          © 2023{" "}
          <a
            href="https://gitlab.com/web-project-1-group-4"
            className="hover:underline"
          >
            Bug Busters. {' '}
          </a>
          <br className="md:hidden"/>
          All Rights Reserved.
        </span>
        <span className="text-sm sm:text-md">
          <a
            className="mr-4 hover:underline md:mr-6"
            onClick={() => navigate("/about-us")}
          >
            About the authors
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
