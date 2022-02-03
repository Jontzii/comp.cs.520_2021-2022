export const PlayerLink = ({ name, onClick, url }) => {
  return (
    <a href="" onClick={(e) => onClick(url, e)}>
      {name}
    </a>
  );
};
