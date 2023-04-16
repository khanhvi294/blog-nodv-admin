import React, { useState } from "react";
import { useQuery } from "react-query";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { getReportingById } from "../../api/adminApi";

const UserList = ({ reporting }) => {
  const userLogin = useSelector((state) => state.user?.data?.info);
  const [users, setUsers] = useState([]);

  const { loading } = useQuery(
    ["reporting", reporting.id],
    () => getReportingById(reporting.id),
    {
      onSuccess: (data) => {
        console.log("data", data);
        setUsers(data?.users);
      },
    }
  );
  return (
    <div className="h-full overflow-hidden">
      <div className="flex flex-col gap-4 h-full overflow-y-auto">
        {userLogin &&
          users?.map((user) => <UserItem user={user} key={user.id}></UserItem>)}
        {loading && (
          <>
            <UserItemLoading />
            <UserItemLoading />
            <UserItemLoading />
          </>
        )}
      </div>
    </div>
  );
};

export default UserList;

const UserItem = ({ user, children }) => {
  const profileUrl = `/profile/${user?.email}`;
  return (
    <div className=" flex w-full items-center justify-between" key={user.id}>
      <div className="flex items-center">
        <span to={profileUrl}>
          <Avatar
            src={user?.avatar}
            className="h-10 w-10"
            alt={user.username}
          />
        </span>
        <span to={profileUrl}>
          <div className="ml-4 mr-2 block">
            <h2 className="text-base font-bold">{user.username}</h2>
            <div className="mt-1 block break-words">
              <p className=" color break-all text-sm font-normal line-clamp-2">
                {user?.bio}
              </p>
            </div>
          </div>
        </span>
      </div>
      <div>{children}</div>
    </div>
  );
};

const UserItemLoading = () => {
  return (
    <div className="relative flex w-full items-center justify-between">
      <div className="flex items-center">
        <div className="h-10 w-10 animate-pulse rounded-full bg-gray-300"></div>
        <div className="ml-4 mr-2 block">
          <div className="h-4 w-20 animate-pulse rounded-full bg-gray-300"></div>
          <div className="mt-1 block break-words">
            <div className="h-4 w-40 animate-pulse rounded-full bg-gray-300"></div>
          </div>
        </div>
      </div>
      <div className="h-8 w-20 animate-pulse rounded-full bg-gray-300"></div>
    </div>
  );
};
