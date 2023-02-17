import React from 'react';

const user = "user"
const userEmail = "user@domain.com"
const times = "times go here"

const Profile = () => {
    return (
        <div>
            <h1>Profle</h1>
            <p>Current user: {user}</p>
            <p>Email: {userEmail}</p>
            <h1>Scheduled Meetings</h1>
            <p>You have meetings at these times:</p>
            {times}
        </div>
    );
};

export default Profile;