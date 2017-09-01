import React, { Component } from 'react';
import UserView from './UserView';

const defaultNoUsersString = "No users to display.";

class UserList extends Component {
    render() {
        function getNoUsersString(props) {
            if (this.props.noUsersString) {
                return this.props.noUsersString;
            }
            else {
                console.log("Using defaultNoUsersString: " + defaultNoUsersString);
                return defaultNoUsersString;
            }
        }

        const userList = this.props.userList;

        if (!userList) {
            console.log("No userlist.");
            return (
                <div>Loading...</div>
            );
        }
        else if (!userList.length === 0) {
            console.log("No users in userlist.");
            return (
                <div>{getNoUsersString(this.props)}</div>
            );
        }
        else {
            console.log("User in userlist.");
            return(
                userList.map((user, i) => {
                    return (<UserView user={user} />);
                })
            )
        }
    }
}

export default UserList;