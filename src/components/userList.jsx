import { useState, useEffect } from 'react';
import { getAllUsers, deleteUser } from './api';
import UserForm from './userForm';
import styles from './UsersList.module.css';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null); 

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const usersData = await getAllUsers();
    setUsers(usersData);
  };

  const handleDeleteUser = async (userId) => {
    await deleteUser(userId);
    loadUsers();
  };

  const toggleForm = (userId = null) => {
    setSelectedUserId(userId);
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setSelectedUserId(null);
    setIsFormVisible(false);
  };

  return (
    <div className={styles.container}>
      <h1>Users</h1>
      <ul className={styles['users-list']}>
        {users.map((user) => (
          <li key={user.id} className={styles['user-item']}>
            <div>
              <strong>ID:</strong> {user.id}<br />
              <strong>Name:</strong> {user.name}<br />
              <strong>Username:</strong> {user.username}<br />
              <strong>Email:</strong> {user.email}<br />
              <strong>Address:</strong> {user.address}<br />
              <strong>Phone:</strong> {user.phone}<br />
              <strong>Website:</strong> {user.website}<br />
              <strong>Company Name:</strong> {user.companyName}<br />
            </div>
            <div>
              <button onClick={() => handleDeleteUser(user.id)} className={styles['delete-btn']}>
                Delete
              </button>
              <button onClick={() => toggleForm(user.id)} className={styles['edit-btn']}>
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={() => toggleForm()} className={styles['add-btn']}>
        Add User
      </button>
      {isFormVisible && (
        <div className={styles.overlay}>
          <div className={styles.formSection}>
            <UserForm userId={selectedUserId} onSuccess={loadUsers} onClose={closeForm} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;
