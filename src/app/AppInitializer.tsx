import React from "react";
import { useDispatch } from "react-redux";
import { loadUserFromStorage } from "@/store/authSlice";

export default function AppInitializer() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadUserFromStorage());
  }, []);

  return null;
}
