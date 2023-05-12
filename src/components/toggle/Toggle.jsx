import React from "react";
import "./toggle.css";

const Toggle = ({ isOn, handleToggle }) => {
    // console.log(isOn);
    return (
        <>
            <div className="container">
                <input
                    checked={isOn}
                    onChange={handleToggle}
                    className="react-switch-checkbox"
                    id={`react-switch-new`}
                    type="checkbox"
                />
                <label
                    style={{ background: isOn && '#006400' }}
                    className="react-switch-label"
                    htmlFor={`react-switch-new`}
                >
                    <span className={`react-switch-button`} />
                </label>
            </div>
        </>
    );
};

export default Toggle;