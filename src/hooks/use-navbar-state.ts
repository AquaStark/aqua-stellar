import { useState } from "react";

// Stores the transient UI state for the landing navbar buttons and sidebar.
const useNavbarState = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(previous => !previous);
  };

  const handleActionSelect = (action: string) => {
    setActiveButton(action);
    setIsSidebarOpen(false);
  };

  const toggleConnection = () => {
    setIsConnected(previous => !previous);
  };

  return {
    isSidebarOpen,
    activeButton,
    isConnected,
    toggleSidebar,
    handleActionSelect,
    toggleConnection
  };
};

export default useNavbarState;

