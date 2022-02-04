export const Logout = ({ handleLogout }) => {
  return (
    <div>
      <button id="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};
