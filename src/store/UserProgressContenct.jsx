import { createContext, useContext, useState } from "react";

const UserProgressContext = createContext({
  progress: " ", // cart  , checkout
  showcart: () => {},
  hidecart: () => {},
  showcheckout: () => {},
  hidecheckout: () => {},
});

export function UserProgressContextProvider({ children }) {
  const [Userprogress, setUserprogress] = useState("");

  function showcart() {
    console.log("cart-opened");
    setUserprogress("cart");
  }

  function hidecart() {
    console.log("cart-closed");
    setUserprogress(" ");
  }
  function showcheckout() {
    setUserprogress("checkout");
  }
  function hidecheckout() {
    setUserprogress(" ");
  }

  

  const userProgressCtx = {
    progress: Userprogress,
    showcart,
    hidecart,
    showcheckout,
    hidecheckout,
   
  };

  return (
    <UserProgressContext.Provider value={userProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
}

export default function Progress_Context() {
  return useContext(UserProgressContext);
}
