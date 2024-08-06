import { createContext, useState } from "react";

export const store = createContext();

const Provider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);

  return (
    <store.Provider
      value={{
        currentSong,
        setCurrentSong
      }}
    >
      {children}
    </store.Provider>
  );
};

export default Provider;
