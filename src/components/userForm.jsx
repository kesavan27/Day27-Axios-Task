import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { createUser, updateUser, getUserById } from './api';
import styles from './UserForm.module.css';

const UserForm = ({ userId, onSuccess, onClose }) => {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        username: '',
        email: '',
        address: '',
        phone: '',
        website: '',
        companyName: ''
    });

    useEffect(() => {
        if (userId) {
            loadUserData(userId);
        }
    }, [userId]);

    const loadUserData = async (userId) => {
        const userData = await getUserById(userId);
        setFormData(userData);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (userId) {
            await updateUser(userId, formData);
        } else {
            await createUser(formData);
        }

        setFormData({
            id: '',
            name: '',
            username: '',
            email: '',
            address: '',
            phone: '',
            website: '',
            companyName: ''
        });
        onSuccess();
    };

    const handleClose = () => {
        setFormData({
            id: '',
            name: '',
            username: '',
            email: '',
            address: '',
            phone: '',
            website: '',
            companyName: ''
        });
        onClose();
    };

    return (
        <div className={styles['form-overlay']}>
            <div className={styles['form-container']}>
                <div className={styles['form-header']}>
                    <h2>{userId ? 'Edit User' : 'Add User'}</h2>
                    <button className={styles['close-btn']} onClick={handleClose}>
                        ×
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <label>
                        ID:
                        <input type="text" name="id" value={formData.id} onChange={handleChange} className={styles.input} readOnly={userId ? true : false} required />
                    </label>
                    <br />
                    <label>
                        Name:
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className={styles.input} required />
                    </label>
                    <br />
                    <label>
                        Username:
                        <input type="text" name="username" value={formData.username} onChange={handleChange} className={styles.input} required />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className={styles.input} required />
                    </label>
                    <br />
                    <label>
                        Address:
                        <input type="text" name="address" value={formData.address} onChange={handleChange} className={styles.input} required />
                    </label>
                    <br />
                    <label>
                        Phone:
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} className={styles.input} required />
                    </label>
                    <br />
                    <label>
                        Website:
                        <input type="text" name="website" value={formData.website} onChange={handleChange} className={styles.input} required />
                    </label>
                    <br />
                    <label>
                        Company Name:
                        <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className={styles.input} required />
                    </label>
                    <br />
                    <button type="submit" className={styles.submitBtn}>
                        {userId ? 'Update' : 'Create'}
                    </button>
                </form>
            </div>
        </div>
    );
};


UserForm.propTypes = {
    userId: PropTypes.string,
    onSuccess: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};

export default UserForm;
