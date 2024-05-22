import { useState } from "react";

const FormInput = (props) => {
  const { errorMessage, handleChange, id, ...inputProps } = props;

  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="mt-4 flex flex-col w-full text-light-gray">
      <input
        className="reg-signin-input"
        {...inputProps}
        onChange={handleChange}
        onBlur={handleFocus}
        focused={focused.toString()}
      />
      <span className="inp-error hidden  p-1 text-[#ff8633] text-xs">
        {errorMessage}
      </span>
    </div>
  );
};

export default FormInput;
