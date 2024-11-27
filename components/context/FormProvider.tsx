"use client"
import React, { createContext, useState, useContext } from 'react'

type FormContextProps = {
    isSubmitted: boolean
    setIsSubmitted: (value: boolean) => void
}

const FormContext = createContext<FormContextProps | null>(null);

export const FormProvider = ({ children }: React.PropsWithChildren) => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    return (
        <FormContext.Provider value={{ isSubmitted, setIsSubmitted }}>
            {children}
        </FormContext.Provider>
    );
};

export const useFormContext = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error("useFormContext must be used within a FormProvider");
    }
    return context;
};
