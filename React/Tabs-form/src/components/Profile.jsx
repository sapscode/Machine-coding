import React from "react";

const Profile = ({ data, setData, error }) => {
  const { name, age, email } = data;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <form className="form">
      <div className="input-fields">
        <div className="input">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            required
            onChange={handleChange}
          />
          {error.name && <span className="errorMessage">{error.name}</span>}
        </div>
        <div className="input">
          <label htmlFor="age">Age: </label>
          <input
            type="number"
            name="age"
            id="age"
            value={age}
            required
            onChange={handleChange}
          />
          {error.age && <span className="errorMessage">{error.age}</span>}
        </div>
        <div className="input">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            required
            onChange={handleChange}
          />
          {error.email && <span className="errorMessage">{error.email}</span>}
        </div>
      </div>
    </form>
  );
};

export default Profile;
