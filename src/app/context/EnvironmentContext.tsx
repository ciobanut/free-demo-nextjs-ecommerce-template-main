'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Environment, DEFAULT_ENVIRONMENT } from '@/config/environments';

interface EnvironmentContextType {
    currentEnvironment: Environment;
    setEnvironment: (env: Environment) => void;
}

const EnvironmentContext = createContext<EnvironmentContextType | undefined>(undefined);

export const EnvironmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentEnvironment, setCurrentEnvironmentState] = useState<Environment>(DEFAULT_ENVIRONMENT);
    const [isMounted, setIsMounted] = useState(false);

    // Load environment from localStorage on mount
    useEffect(() => {
        const savedEnv = localStorage.getItem('behavora_env') as Environment | null;
        if (savedEnv && (savedEnv === 'dev' || savedEnv === 'prod')) {
            setCurrentEnvironmentState(savedEnv);
        }
        setIsMounted(true);
    }, []);

    const setEnvironment = (env: Environment) => {
        setCurrentEnvironmentState(env);
        localStorage.setItem('behavora_env', env);
        // Reload the page to apply new environment to script tag
        window.location.reload();
    };

    // Don't render children until mounted to avoid hydration mismatch
    if (!isMounted) {
        return null;
    }

    return (
        <EnvironmentContext.Provider value={{ currentEnvironment, setEnvironment }}>
            {children}
        </EnvironmentContext.Provider>
    );
};

export const useEnvironment = (): EnvironmentContextType => {
    const context = useContext(EnvironmentContext);
    if (context === undefined) {
        throw new Error('useEnvironment must be used within an EnvironmentProvider');
    }
    return context;
};
