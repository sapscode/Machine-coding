import React from "react";

const Interests = ({ data, setData, error }) => {
  const { interests } = data;

  const checkInterest = (interest) => {
    return interests.includes(interest);
  };

  const handleChecked = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setData((prev) => ({ ...prev, interests: [...prev.interests, name] }));
    } else {
      setData((prev) => ({
        ...prev,
        interests: prev.interests.filter((interest) => interest !== name),
      }));
    }
  };

  return (
    <form>
      <div className="input-fields">
        <div className="input">
          <label htmlFor="coding">Coding</label>
          <input
            type="checkbox"
            name="coding"
            checked={checkInterest("coding")}
            onChange={handleChecked}
          />
        </div>
        <div className="input">
          <label htmlFor="music">Music</label>
          <input
            type="checkbox"
            name="music"
            checked={checkInterest("music")}
            onChange={handleChecked}
          />
        </div>
        <div className="input">
          <label htmlFor="travel">Travel</label>
          <input
            type="checkbox"
            name="travel"
            checked={checkInterest("travel")}
            onChange={handleChecked}
          />
        </div>
        <div className="input">
          <label htmlFor="gym">Gym</label>
          <input
            type="checkbox"
            name="gym"
            checked={checkInterest("gym")}
            onChange={handleChecked}
          />
        </div>
        {error.interests && (
          <span className="errorMessage">{error.interests}</span>
        )}
      </div>
    </form>
  );
};

export default Interests;
