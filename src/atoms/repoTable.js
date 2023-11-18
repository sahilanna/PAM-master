import React from "react";

function RepoTable({ data }) {
  return (
    <table className="ui celled table">
      <thead>
        <tr>
          <th>Project Name</th>
          <th>Repository Name</th>
          <th>Repository Description</th>
        </tr>
      </thead>
      <tbody>
        {data && data.length > 0 ? (
          data.map((item, index) =>
            item.repositories &&
            item.repositories.length > 0 ? (
              item.repositories.map((repo) => (
                <tr
                  key={`${item.projectName}-${repo.name}`}
                >
                  <td>{item.projectName}</td>
                  <td>{repo.name}</td>
                  <td>{repo.description}</td>
                </tr>
              ))
            ) : (
              <tr key={item.projectName}></tr>
            )
          )
        ) : (
          <tr>
            <td colSpan="2">No data available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default RepoTable;
