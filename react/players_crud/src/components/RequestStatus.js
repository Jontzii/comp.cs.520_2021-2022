export const RequestStatus = ({ status }) => {
  return (
    <div className="request-status">
      {typeof status === "string" && status.length > 0 && status}
    </div>
  );
};
