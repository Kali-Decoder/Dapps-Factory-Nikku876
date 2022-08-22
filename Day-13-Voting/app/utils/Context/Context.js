import React, { useContext } from 'react';

export const ElectionContext= useContext();

const ContextProvider=({children})=>{
    return(<ElectionContext.Provider value={{}}>
        {children}
    </ElectionContext.Provider>)
}


export default ContextProvider;