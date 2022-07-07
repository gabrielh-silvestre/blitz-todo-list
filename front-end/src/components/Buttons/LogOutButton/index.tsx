import { HiLogout } from "react-icons/hi";

import { useUsers } from "../../../hooks/useUsers";

export function LogOutButton() {
  const { logout } = useUsers();

  return (
    <button onClick={() => logout()}>
      <HiLogout />
    </button>
  );
}
