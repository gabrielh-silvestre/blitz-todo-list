import toast from "react-hot-toast";
import { HiLogout } from "react-icons/hi";

import { userStore } from "../../../stores/user";

export function LogOutButton() {
  const { setUserToken } = userStore((state) => state);

  const handleLogOut = () => {
    setUserToken(null);
    toast.success("Logged out successfully!");
  };

  return (
    <button onClick={handleLogOut}>
      <HiLogout />
    </button>
  );
}
