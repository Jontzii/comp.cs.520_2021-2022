/** @format COMPONENTS */

import { useSelector } from "react-redux";

export const RequestStatus = () => {
  const status = useSelector((state) => state.status);

  return <div className="request-status">{status}</div>;
};
