import React, { useEffect, useState } from "react";

function UserList() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setusers] = useState([]);

  //fetching data from the api function
  useEffect(() => {
    setIsLoading(true); 
    fetch("https://gorest.co.in/public/v2/users")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoading(false);
          setusers(result);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      );
  }, []);

  const sortedUserByStatus = users
    .sort((a, b) => a.id - b.id) //we use this function to sort the users by id
    .sort((a, b) => a.status.localeCompare(b.status)); //we use this function to sort the users by activity status

  if (isLoading) return <div>Loading..</div>; //put out loading while loading
  if (!isLoading && error) return <div>Error</div>; //put out error in case it fails
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedUserByStatus.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
