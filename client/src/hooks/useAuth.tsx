import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { refreshToken } from "@/services/auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { is_authenticated } = useAppSelector((state) => state.auth);

  /* Protected Login / Register */
  useEffect(() => {
    async function verifyToken() {
      if (!is_authenticated && localStorage.getItem("access") !== null) {
        try {
          await refreshToken();
          router.push("/");
        } catch (error) {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          console.log("Your session has expired");
          console.log(error);
        }
      } else {
        setAuthChecked(true);
      }
    }
    verifyToken();
  }, [is_authenticated]);

  return { router, pathname, dispatch, authChecked };
};
