import { createContext, useState, useRef } from "react";
import { useOutsideClickSidebar } from "../hooks/useOutsideClickSidebar";

const OpenSidebarContext = createContext();

function OpenSidebarProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarRef = useRef(null);
  const headerRef = useRef(null);

  useOutsideClickSidebar(() => setIsSidebarOpen(false), sidebarRef, headerRef);

  function toggleSidebar() {
    setIsSidebarOpen((isSidebarOpen) => !isSidebarOpen);
  }

  return (
    <OpenSidebarContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        sidebarRef,
        headerRef,
      }}
    >
      {children}
    </OpenSidebarContext.Provider>
  );
}

export { OpenSidebarContext, OpenSidebarProvider };
