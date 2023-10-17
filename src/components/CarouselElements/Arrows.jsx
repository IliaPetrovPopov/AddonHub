import { VisibilityContext } from "react-horizontal-scrolling-menu";
import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

const Arrow = ({
  children,
  disabled,
  onClick
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        right: "1%",
        opacity: disabled ? "0" : "1",
        userSelect: "none"
      }}
    >
      {children}
    </button>
  );
}

Arrow.propTypes = {
    children: PropTypes.any,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
}


export function LeftArrow() {
  const {
    isFirstItemVisible,
    scrollPrev,
    visibleElements,
    initComplete
  } = useContext(VisibilityContext);

  const [disabled, setDisabled] = useState(
    !initComplete || (initComplete && isFirstItemVisible)
  );
  useEffect(() => {
    // NOTE: detect if the whole component is visible
    if (visibleElements.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleElements]);

  return (
    <Arrow disabled={disabled} onClick={() => scrollPrev()}>
      <i className="btn bi bi-arrow-left"/>
    </Arrow>
  );
}

export function RightArrow() {
  const { isLastItemVisible, scrollNext, visibleElements } = useContext(
    VisibilityContext
  );

  const [disabled, setDisabled] = useState(
    !visibleElements.length && isLastItemVisible
  );
  useEffect(() => {
    if (visibleElements.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleElements]);

  return (
    <Arrow disabled={disabled} onClick={() => scrollNext()}>
      <i className="btn bi bi-arrow-right"/>
    </Arrow>
  );
}