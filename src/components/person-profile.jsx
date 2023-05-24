import React from 'react';
import ReactMarkdown from 'react-markdown';
import '../person-profile.style.scss';

export default function PersonProfile() {
  const user = {
    fname: 'Chad',
    lname: 'III',
    photo: 'https://source.unsplash.com/random/200x200/?img=1',
    company: 'Meta',
    email: 'giga.chad@dartmouth.edu',
    connectionType: 'Homie',
    notes: '# Notes About Chad III:\n- Chad works at meta\n- Loves beer\n- Enjoys a solid workout',
  };

  const tasks = [
    { id: 0, task: 'Follow up email with my homie' },
    { id: 1, task: 'Send him my resume!' },
    { id: 2, task: 'Set up call' },
  ];

  const emails = [
    { id: 0, title: 'Meeting?', details: 'When do you think you have time to meet?...' },
    { id: 1, title: 'Working at Meta', details: 'How are you liking it there so far?...' },
  ];

  return (
    <div className="person-profile">
      <div className="first-row">
        <div className="basic-info">
          <div className="profile-pic">
            <img src={user.photo} alt="profile" />
          </div>
          <div className="info-text">
            <h1>{`${user.fname} ${user.lname}`}</h1>
            <p>{user.company}</p>
            <p>{user.email}</p>
            <p>{`Connection Type: ${user.connectionType}`}</p>
          </div>
          <div className="person-notes">
            <ReactMarkdown className="notes-content">{user.notes}</ReactMarkdown>
          </div>
        </div>
        <div className="todos">
          <h1>Tasks/To Dos</h1>

          {tasks.map((e) => (
            <div className="task" key={e.id}>{e.task}</div>
          ))}
        </div>
      </div>

      <div className="email-container">
        <h1>Email Interactions</h1>
        {emails.map((email) => (
          <div className="email-interaction" key={email.id}>
            <h2>{email.title}</h2>
            <h3>{email.details}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
