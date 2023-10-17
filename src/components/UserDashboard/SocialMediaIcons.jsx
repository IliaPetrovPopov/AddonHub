import PropTypes from "prop-types";

const SocialMediaIcons = ({ user }) => {
  return (
    <span className="w-full text-2xl flex justify-end">
      {user.facebook && (
        <a href={user.facebook}>
          <i className="bi bi-facebook mr-2"></i>
        </a>
      )}
      {user.twitter && (
        <a href={user.twitter}>
          <i className="bi bi-twitter p-2"></i>
        </a>
      )}
      {user.linkedin && (
        <a href={user.linkedin}>
          <i className="bi bi-linkedin p-2"></i>
        </a>
      )}
      {user.github && (
        <a href={user.github}>
          <i className="bi bi-github p-2"></i>
        </a>
      )}
    </span>
  );
};

SocialMediaIcons.propTypes = {
  user: PropTypes.object,
};

export default SocialMediaIcons;
