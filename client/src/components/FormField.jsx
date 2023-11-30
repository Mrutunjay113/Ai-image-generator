import React from "react";

const FormField = ({
  labelName,
  type,
  name,
  value,
  placeholder,
  isSurpriseMe,
  handleSurpriseMe,
  handleChange,
}) => {
  return (
    <>
      <div className="flex items-center  ">
        <label
          htmlFor={name}
          className="block text-base font-medium text-gray-900"
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="font-semibold text-xs py-1 px-2 ml-2 rounded-[5px] btn-grad_1"
          >
            Surprise me
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        className=" border border-gray-300 bg-transparent text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
      />
    </>
  );
};

export default FormField;
