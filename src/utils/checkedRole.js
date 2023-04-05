export const ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
};

export const checkedRole = (data) => {
  return ROLES.ADMIN === data?.role;
};
