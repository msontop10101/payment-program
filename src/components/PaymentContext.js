import React, { createContext, useState } from 'react';

const PaymentContext = createContext();

const PaymentProvider = ({ children }) => {
    const [submittedValues, setSubmittedValues] = useState();

    return (
        <PaymentContext.Provider value={{ submittedValues, setSubmittedValues }}>
            {children}
        </PaymentContext.Provider>
    );
};

export { PaymentContext, PaymentProvider };