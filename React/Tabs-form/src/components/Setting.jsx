import React from "react";

const Setting = ({ data, setData }) => {
  const { theme } = data;
  const handleChange = (e) => {
    setData({ ...data, theme: e.target.value });
  };
  return (
    <form>
      <div className="input-fields">
        <div className="input">
          <label htmlFor="dark">Dark</label>
          <input
            type="radio"
            name="theme"
            id="dark"
            value="dark"
            checked={theme === "dark"}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label htmlFor="light">Light</label>
          <input
            type="radio"
            name="theme"
            id="light"
            value="light"
            checked={theme === "light"}
            onChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
};

export default Setting;
