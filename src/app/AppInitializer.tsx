import React from "react";
import { loadUserFromStorage } from "@/store/authSlice";
import { useAppDispatch } from "@/store/hooks";

export default function AppInitializer() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return null;
}
