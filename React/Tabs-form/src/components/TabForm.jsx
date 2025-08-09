import { useState, useRef } from "react";
import Interests from "./Interests";
import Profile from "./Profile";
import Setting from "./Setting";

const TabForm = () => {
  const [data, setData] = useState({
    name: "",
    age: "",
    email: "",
    interests: [],
    theme: "light",
  });

  const [error, setError] = useState({});

  const [activeTab, setActiveTab] = useState(0);

  const nextRef = useRef(null);
  const prevRef = useRef(null);

  const tabs = [
    {
      name: "Profile",
      component: Profile,
      validate: () => {
        const err = {};
        if (!data.name || data.name.length < 2) {
          err.name = "Please enter a valid name !";
        }
        if (!data.age) {
          err.age = "Please enter age !";
        }
        let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
        if (!data.email || !regex.test(data.email)) {
          err.email = "Please enter a valid email !";
        }

        setError(err);
        return Object.keys(err).length ? false : true;
      },
    },
    {
      name: "Interests",
      component: Interests,
      validate: () => {
        const err = {};
        if (!data.interests || !data.interests.length) {
          err.interests = "Please select atleast one interest !";
        }

        setError(err);
        return Object.keys(err).length ? false : true;
      },
    },
    {
      name: "Setting",
      component: Setting,
      validate: () => {
        return true;
      },
    },
  ];

  const selectTab = (i) => {
    if (tabs[activeTab].validate()) {
      setActiveTab(i);
    }
  };
  const changeTab = (e) => {
    if (tabs[activeTab].validate()) {
      if (e.target.classList.contains("prev")) {
        setActiveTab((prev) => prev - 1);
      } else {
        setActiveTab((prev) => prev + 1);
      }
    }
  };

  const ActiveTabComponent = tabs[activeTab].component;
  return (
    <div className="tab-form">
      <div className="tabs-container">
        {tabs.map((tab, i) => {
          return (
            <div
              className={`tab ${activeTab === i && "selected"}`}
              key={i}
              onClick={() => selectTab(i)}
            >
              {tab.name}
            </div>
          );
        })}
      </div>
      <div className="content">
        <main>
          <ActiveTabComponent data={data} setData={setData} error={error} />
        </main>
        <div className="footer-btn-container">
          <button
            className="prev btn"
            type="button"
            disabled={activeTab === 0}
            ref={prevRef}
            onClick={changeTab}
          >
            ⬅️
          </button>
          <button
            className="next btn"
            type="button"
            disabled={activeTab === tabs.length - 1}
            ref={nextRef}
            onClick={changeTab}
          >
            ➡️
          </button>
        </div>
      </div>
      {activeTab === tabs.length - 1 && (
        <div className="submit-btn-container">
          <button className="btn">Submit</button>
        </div>
      )}
    </div>
  );
};

export default TabForm;
