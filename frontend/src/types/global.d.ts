export { }

declare global {
    type ToggleSignUp = {
        toggleSignUp: (e: MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    };

    type SetIsLogged = {
        setIsLogged: () => void;
    };

    type User = {
        _id: string;
        username: string;
        email: string;
        DOB: Date;
    }

    type AuthContextType = {
        user: User | null;
        setUser: (user: User | null) => void;
        loading: boolean;
        setLoading: (loading: boolean) => void;
    };

    interface Note {
        id: number | string;
        title: string;
        content: string;
        isLive: boolean;
    }

    interface NoteType {
        _id: string | number | object;
        title: string;
        content: string;
        isLive: boolean;
    }
}
