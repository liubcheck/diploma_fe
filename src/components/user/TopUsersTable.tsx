import React from 'react';

interface Props {
  topUsersData: Record<string, number>;
}

const TopUsersTable = ({topUsersData}: Props) => {
  return (
    <table className="mx-auto users-table">
      <thead>
        <tr className="table-header">
          <th>Нікнейм</th>
          <th>Рахунок</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(topUsersData).map(([username, score]) => (
          <tr key={username}>
            <td>{username}</td>
            <td>{score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TopUsersTable;
