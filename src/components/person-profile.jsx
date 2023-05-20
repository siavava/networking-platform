import React from 'react';

export default function PersonProfile() {
  const user = {
    fname: 'Chad',
    lname: 'III',
    photo: 'url',
    email: 'giga.chad@dartmouth.edu',
    connectionType: 'homie',
    notes: '# Notes About Chad III: \n - chad works at meta \n - loves beer \n - enjoys a solid workout',
  };

  const tasks = [
    { task: 'Follow up email with my homie' },
    { task: 'Send him my resume!' },
    { task: 'Set up call' },
  ];

  const emails = [
    { title: 'Meeting?', details: 'When do you think you have time to meet?...' },
    { title: 'Working at Google', details: 'How are you liking it there so far?...' },
  ];

  return (
    <div className="person-profile">
      <div className="first-row">
        <div className="basic-info">
          <h1>{`${user.fname} ${user.lname}`}</h1>
        </div>
        <div className="todos">
          <h1>Tasks/To Dos</h1>

          {tasks.map((e) => (
            <div className="task">{e.task}</div>
          ))}
        </div>
      </div>

      <div className="email-container">
        <h1>Email Interactions</h1>
        {emails.map((email) => (
          <div className="email-interaction">
            <h2>{email.title}</h2>
            <h3>{email.details}</h3>
          </div>
        ))}
        {/* <div className="email-interaction">
          <h1>email title 1</h1>
          <h2>email person</h2>
          <h3>email details</h3>
        </div>

        <div className="email-interaction">
          <h1>email title 2</h1>
          <h2>email person</h2>
          <h3>email details</h3>
        </div> */}
      </div>
    </div>
  );
}
