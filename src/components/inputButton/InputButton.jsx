import { useState } from "react";
import "./InputButton.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputButton = ({ type, value, label, Icon, placeHolder, inputValueHandler }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showDD, setShowDD] = useState(false);
  const [inputData, setInputData] = useState(value);

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const handleDivKeyDown = (event) => {
    event.stopPropagation();
    setIsFocused(true);
  };

  const inputHandler = (event) => {
    console.log(event.target.value);
    // setInputData(event.target.value);
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
      {showDD ? (
        <div className="custom-dropdown">
          <div className="ul-div-s">
            <div className="li-div">Nasim Akhtar</div>
            <div className="li-div">Nasim Akhtar</div>
            <div className="li-div">Nasim Akhtar</div>
            <div className="li-div">Nasim Akhtar</div>
            <div className="li-div">Nasim Akhtar</div>
          </div>
          {/* <ul class="dropdown-menu show">
          <li>
            <a class="dropdown-item active" href="#">
              Action
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Another action
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Something else here
            </a>
          </li>
          <li>
            <hr class="dropdown-divider" />
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Separated link
            </a>
          </li>
        </ul> */}
        </div>
      ) : null}
    </div>
  );
};

export default InputButton;
