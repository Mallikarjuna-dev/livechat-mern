import React from "react";
import { GrFormClose } from "react-icons/gr";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <div
      className="inline-flex px-1 cursor-pointer items-center rounded-xl bg-purple-400 text-xs font-semibold"
      onClick={handleFunction}
    >
      {user.name}
      <GrFormClose className="ml-0.5 text-sm" />
    </div>
  );
};

export default UserBadgeItem;
