import { useState } from "react";
import "./InputButton.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputButton = ({ type, value, label, Icon, placeHolder, inputValueHandler }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const handleDivKeyDown = (event) => {
    event.stopPropagation();
    setIsFocused(true);
  };

  const inputHandler = (event) => {
    inputValueHandler(event.target.value);
  };

  return (
    <div className=" btn-comp">
      <label htmlFor="formGroupExampleInput2" className="form-label">
        {label}*
      </label>
      <div className={`input-container ${isFocused ? "focused" : ""}`} onClick={handleDivKeyDown}>
        <input
          tabIndex={0}
          type={type && showPassword ? "text" : type}
          className="form-control shadow-none"
          //   id="formGroupExampleInput2"
          placeholder={placeHolder}
          onBlur={() => setIsFocused(false)}
          onChange={inputHandler}
          value={value}
        />
        {type === "password" ? (
          <>
            {showPassword ? (
              <FaEye className="eye-logo" onClick={showPasswordHandler} />
            ) : (
              <FaEyeSlash className="eye-logo" onClick={showPasswordHandler} />
            )}
          </>
        ) : (
          Icon
        )}
      </div>
    </div>
  );
};

export default InputButton;
