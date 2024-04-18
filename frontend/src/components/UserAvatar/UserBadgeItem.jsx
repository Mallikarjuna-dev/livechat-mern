import React from "react";
import { GrFormClose } from "react-icons/gr";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <div
      className="inline-flex pl-1.5 pb-0.5 bg-orange-400 cursor-pointer items-center rounded-lg text-xs font-semibold"
      onClick={handleFunction}
    >
      {user.name}
      <GrFormClose className="mx-0.5 mt-0.5 text-sm " />
    </div>
  );
};

export default UserBadgeItem;
