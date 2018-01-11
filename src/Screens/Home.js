import React, { Component } from "react";
import { connect } from "react-redux";
import "./Home.css";
import { Link } from "react-router-dom";

const description = 
"Lorem ipsum dolor sit amet, consectetur adipiscing elit.\
 Nullam quis semper dolor. Nunc purus nisi, elementum id.\
 Distinxit media praeter vultus pro ligavit:\
 persidaque flamma addidit innabilis dissaepser.\
 Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

class Home extends Component {
    render() {
        return (
            <div className="home">
                <h2>Home</h2>
                <div className="description">{description}</div>
                <Link to="/register">Sign Up!</Link>
            </div>
        );
    }
}

export default connect()(Home);