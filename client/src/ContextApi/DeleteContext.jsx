import React, { createContext, useState } from 'react';

export const MyDeleteContext = createContext();

export default function DeleteProvider({ children }) {
    const [deleteContext, setDeleteContext] = useState(false);

    return (
        <MyDeleteContext.Provider value={{ deleteContext, setDeleteContext }}>
            {children}
        </MyDeleteContext.Provider>
    );
}
