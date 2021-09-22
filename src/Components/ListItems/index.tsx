import React from "react";
import { faStar, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

function ListItem(props: any) {
  return (
    <ul className="list" style={{ listStyleType: "none" }}>
      {props.friends.map((friend: any) => {
        return (
          <li className="list-item">
            <div className="title">
              <p className="title-name">{friend.name}</p>
              <p className="title-status">Is your Friend</p>
            </div>
            <div className="list-actions">
              <FontAwesomeIcon
                className="fav-button"
                icon={faStar}
                size="lg"
                color={friend.isFav ? "yellow" : "white"}
                onClick={() => props.handleFavorite(friend)}
              />
              <FontAwesomeIcon
                className="delete-button"
                icon={faTrash}
                size="lg"
                color="white"
                key={friend}
                onClick={() => props.handleDelete(friend)}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default ListItem;
