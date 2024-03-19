import { useContext } from "react";
import { OpenSidebarContext } from "../context/OpenSidebarContext";

export function useOpenSidebar() {
  const context = useContext(OpenSidebarContext);
  if (context === undefined) {
    throw new Error("useOpenSidebar must be used within a OpenSidebarProvider");
  }
  return context;
}
