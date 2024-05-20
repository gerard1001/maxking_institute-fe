import { ENUM_ROLE_TYPE, User } from "../interfaces/user.interface";

export default function userRoleAnalytics(entities: User[]) {
  const data: { [key in ENUM_ROLE_TYPE]: number } = {
    SUPER_ADMIN: 0,
    ADMIN: 0,
    MANAGER: 0,
    MENTOR: 0,
    CLIENT: 0,
  };

  entities?.forEach((entity) => {
    const role = entity?.roles[0]?.type;
    data[role] = data[role] ? data[role] + 1 : 1;
  });

  data.SUPER_ADMIN = data.SUPER_ADMIN || 0;
  data.ADMIN = data.ADMIN || 0;
  data.MANAGER = data.MANAGER || 0;
  data.MENTOR = data.MENTOR || 0;
  data.CLIENT = data.CLIENT || 0;

  const res = [
    ["Role", `Number of Users in Role`],
    ["admin", data.ADMIN],
    ["manager", data.MANAGER],
    ["mentor", data.MENTOR],
    ["client", data.CLIENT],
  ];

  return res;
}
