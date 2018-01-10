import React, { Component } from "react";
import { connect } from "react-redux"

const mapStateToProps = state => ({
    currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({

});

class Home extends Component {
    constructor(props) {
        super (props);
    }

    render() {
        return (
            <div className="home">
                <h2>Home</h2>
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis semper
dolor. Nunc purus nisi, elementum id. Distinxit media praeter vultus pro ligavit:
persidaque flamma addidit innabilis dissaepser. Lorem ipsum dolor sit amet,
consectetur adipiscing elit.</div>
                <button>Sign Up!</button>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);