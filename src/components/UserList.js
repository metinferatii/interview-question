import React, { useEffect, useState } from 'react';

function UserList() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setusers] = useState([]);
  
    useEffect(() => {
      fetch("https://gorest.co.in/public/v2/users")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setusers(result);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])    

    users.sort((a, b) => a.id - b.id);

    users.sort((a, b) => a.status.localeCompare(b.status));

    if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
            <div>
               <table>
               <thead>
                      <tr>
                          <th>ID</th>
                          <th>
                              Name
                          </th>
                          <th>Status</th>
                      </tr>
              </thead>
              <tbody>
              {users.map(user => (
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
}

export default UserList;