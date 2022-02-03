export const PlayerLink = ({ name, onClick, url }) => {
  return (
    <a href={url} onClick={(e) => onClick(url, e)}>
      {name}
    </a>
  );
};
