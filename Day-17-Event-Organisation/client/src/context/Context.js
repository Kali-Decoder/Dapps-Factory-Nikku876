import React, { createContext,useEffect,useState } from 'react'
export const EventContext= createContext();
export const Eventprovider = ({children}) => {
    const [currentAccount,setCurrentAccount]=useState(undefined);

  return (
    <EventContext.Provider value={{}}>
        {children}
    </EventContext.Provider>
  )
}
