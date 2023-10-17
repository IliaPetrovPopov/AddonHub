import PropTypes from "prop-types";
import { seeBlockingReason } from "../../services/admin.service";
import { useState } from "react";

const Badge = ({ item, itemsSet, user }) => {
  const color = itemsSet[item] || "gray";

  if (item === "blocked") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [blockReason, setBlockReason] = useState("");
    const fetchReason = async () => {
      const reason = await seeBlockingReason(user.username);
      setBlockReason(reason);
    };

    fetchReason();

    return (
      <div className="tooltip tooltip-primary" data-tip={`Reason: ${blockReason}`}>
        <span
          className="badge"
          style={{ backgroundColor: color, color: "white" }}
        >
          {item}
        </span>{" "}
      </div>
    );
  }
  return (
    <span className="badge" style={{ backgroundColor: color, color: "white" }}>
      {item}
    </span>
  );
};

Badge.propTypes = {
  item: PropTypes.string,
  itemsSet: PropTypes.object,
  user: PropTypes.object,
};

export default Badge;
