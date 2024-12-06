"use client"
import React, { createContext, useState, useContext } from 'react'

type FormState = {
    [formId: string]: {
        isLocked: boolean
        isSubmitted: boolean
    }
}

interface SignupData {
    email?: string
    password?: string
    username?: string
    dob?: string
    sex?: boolean
    height?: number
    weight?: number
    goal_type?: string[]
    with_gym?: boolean
    workout_days?: string[]
    intensity?: string
}

type FormContextProps = {
    forms: FormState
    lockForm: (formId: string) => void
    unlockForm: (formId: string) => void
    submitForm: (formId: string) => void
    signupData: SignupData
    updateSignupData: (data: Partial<SignupData>) => void
}


const FormContext = createContext<FormContextProps | null>(null);

export const FormProvider = ({ children }: React.PropsWithChildren) => {
    const [forms, setForms] = useState<FormState>({});
    const [signupData, setSignupData] = useState<SignupData>({});

    const updateSignupData = (data: Partial<SignupData>) => {
        setSignupData((prev) => ({ ...prev, ...data }));
    }

    const lockForm = (formId: string) => {
        setForms((prev) => ({
            ...prev,
            [formId]: { ...prev[formId], isLocked: true },
        }));
    };

    const unlockForm = (formId: string) => {
        setForms((prev) => ({
            ...prev,
            [formId]: { ...prev[formId], isLocked: false },
        }));
    };

    const submitForm = (formId: string) => {
        setForms((prev) => ({
          ...prev,
          [formId]: { ...prev[formId], isSubmitted: true },
        }));
      };


    return (
        <FormContext.Provider value={{ forms, lockForm, unlockForm, submitForm, signupData, updateSignupData }}>
            {children}
        </FormContext.Provider>
    );
};

export const useFormContext = (formId: string) => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error("useFormContext must be used within a FormProvider");
    }

    const { forms, lockForm, unlockForm, submitForm, signupData, updateSignupData } = context;
    const formState = forms[formId] || { isLocked: false, isSubmitted: false };

    return {
        ...formState,
        lockForm: () => lockForm(formId),
        unlockForm: () => unlockForm(formId),
        submitForm: () => submitForm(formId),
        signupData,
        updateSignupData
    }
};
