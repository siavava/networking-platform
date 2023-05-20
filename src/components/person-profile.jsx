import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function PersonProfile() {
  const user = {
    fname: 'Chad',
    lname: 'III',
    photo: 'https://source.unsplash.com/random/200x200/?img=1',
    company: 'Google',
    email: 'giga.chad@dartmouth.edu',
    connectionType: 'homie',
    // "# THIS IS A GRIM BABY\n\n* very soft\n* very cute\n* i want himb"
    notes: '# Notes About Chad III:\n- chad works at meta\n- loves beer\n- enjoys a solid workout',
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
          <img src={user.photo} alt="profile" />
          <h1>{`${user.fname} ${user.lname}`}</h1>
          <p>{user.company}</p>
          <p>{user.email}</p>
          <p>{`Connection Type: ${user.connectionType}`}</p>
          <ReactMarkdown>{user.notes}</ReactMarkdown>
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
