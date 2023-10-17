import { useNavigate } from "react-router";

const SkipButton = () => {
  const navigate = useNavigate();
  return (
    <button className="btn btn-secondary btn-sm md:btn-md" onClick={() => navigate("/")}>
      Cancel
    </button>
  );
};

export default SkipButton;
