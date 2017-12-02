import React from "react";
import PropTypes from "prop-types";

//import Wish from '../Models/Wish';

import WishView from "./WishView";

const WishList = props => {
  if (!props.wishList) {
    return <div>Loading...</div>;
  }

  if (props.wishList.length === 0) {
    return <div>No wishes yet.</div>;
  }

  const isCurrentUser = props.isCurrentUser;

  return (
    <div>
      {props.wishList.map((wish, i) => {
        return <WishView key={i} wish={wish} isCurrentUser={isCurrentUser} />;
      })}
    </div>
  );
};

WishList.propTypes = {
  wishList: PropTypes.arrayOf(PropTypes.object),
  isCurrentUser: PropTypes.bool.isRequired
};

export default WishList;
