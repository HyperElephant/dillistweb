import React, { Component } from "react";
import { connect } from "react-redux";
import "./LoginRegister.css";

class LoginRegister extends Component {
    getHeader(props) {
        if (props.login) {
            return (
                <h2>Welcome back!</h2>
            )
        }
        else if (props.register) {
            return (
                <h2>Welcome for the first time!</h2>
            )
        }
    }

    render() {
        return (
            <div className="loginRegister">
                {this.getHeader(this.props)}
                <form>
                    <ul className="list">
                        <li>
                            <input/>
                        </li>
                        <li>
                            <input/>
                        </li>
                        <li>
                            <button/>
                        </li>
                    </ul>
                </form>
            </div>
        )
    }
}

export default connect()(LoginRegister);