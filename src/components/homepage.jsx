import React from 'react';
import '../homepage.style.scss';

export default function HomePage() {
  const user = { name: 'Chad IV' };
  const tasks = {
    overdue: [],
    today: [
      { task: 'follow up', company: 'google', person: 'bob bobby' },
      { task: 'follow up, second email', company: 'apple', person: 'joe bro' },
      { task: 'initial reach out', company: 'McKinsey', person: 'Susan Sue' },
      { task: 'send cover letter', company: 'meta', person: 'Allie Rally' },
    ],
    upcoming: [],
  };
  const suggestions = [
    'Google',
    'Apple',
    'Jane Street',
    'Citadel',
    'McKinsey',
  ];
  return (
    <div className="homepage">
      <div className="main-panel">
        <div className="homepage-title">
          { `Welcome back, ${user.name || 'anonymous user'}!` }
        </div>
        <div className="homepage-tasks">
          <div className="homepage-tasks-overview">
            <div className="homepage-tasks-overview-item">
              { `Overdue Tasks (${tasks.overdue.length})`}
            </div>

            <div className="homepage-tasks-overview-item">
              { `Today's Tasks (${tasks.today.length})`}
            </div>

            <div className="homepage-tasks-overview-item">
              { `Upcoming Tasks (${tasks.upcoming.length})`}
            </div>
          </div>
          <table className="homepage-tasks-table">
            <tr className="homepage-tasks-table-row table-header">
              <th className="homepage-tasks-table-cell header"> Task </th>
              <th className="homepage-tasks-table-cell header"> Company </th>
              <th className="homepage-tasks-table-cell header"> Person </th>
            </tr>
            { tasks.today.map((task) => (
              <tr className="homepage-tasks-table-row">
                <td className="homepage-tasks-table-cell"> {task.task} </td>
                <td className="homepage-tasks-table-cell"> {task.company} </td>
                <td className="homepage-tasks-table-cell"> {task.person} </td>
              </tr>
            ))}
          </table>
        </div>
      </div>

      <div className="side-panel">
        <div className="side-panel-title"> Suggestions </div>
        <ul className="side-panel-suggestions">
          { suggestions.map((suggestion) => (
            <li className="side-panel-suggestions-item"> {suggestion} </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
