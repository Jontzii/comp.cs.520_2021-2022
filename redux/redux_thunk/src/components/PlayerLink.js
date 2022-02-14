/** @format COMPONENTS */

import { useDispatch } from "react-redux";
import { getSelectedPlayer } from "../redux/actionCreators/thunks/PlayerLink";

export const PlayerLink = ({ name, url }) => {
  const dispatch = useDispatch();

  const onClick = (e) => {
    e.preventDefault();
    dispatch(getSelectedPlayer(url));
  };

  return (
    <a href={url} onClick={onClick}>
      {name}
    </a>
  );
};
