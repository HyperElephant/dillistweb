import WishView from './WishView';
import React from 'react';

const WishList = props => {
  if (!props.wishList) {
    return (
      <div>Loading...</div>
    );
  }

  if (props.wishList.length === 0) {
    return (
      <div>
        No wishes yet.
      </div>
    );
  }

  const isCurrentUser = props.isCurrentUser;

  return (
    <div>
      {
        props.wishList.map((wish, i) => {
          return (
            <WishView key={i} wish={wish} isCurrentUser={isCurrentUser}/>
          );
        })
      }
    </div>
  );
};

export default WishList;
