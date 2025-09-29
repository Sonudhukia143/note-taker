import { useState, type JSX , createContext } from 'react';

const defaultValue = {
    user: null,
    setUser: () => {},
    loading: false,
    setLoading: () => {}
};

const AuthContext = createContext<AuthContextType>(defaultValue);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const [user,setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const value = {
        user,
        setUser,
        loading,
        setLoading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };