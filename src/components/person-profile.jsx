import React from 'react';

export default function PersonProfile() {
  return (
    <div className="person-profile">
      <div className="first-row">
        <div className="basic-info">
          <h1>Your Name</h1>
        </div>
        <div className="todos">
          <h1>Tasks/To Dos</h1>
        </div>
      </div>

      <div className="email-container">
        <div className="email-interaction">
          <h1>email title 1</h1>
          <h2>email person</h2>
          <h3>email details</h3>
        </div>

        <div className="email-interaction">
          <h1>email title 2</h1>
          <h2>email person</h2>
          <h3>email details</h3>
        </div>
      </div>
    </div>
  );
}
