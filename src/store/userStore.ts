import { create } from "zustand";

interface User {
    userId: string;
    email: string;
}

interface Workspace {
    _id: string;
    name: string;
}

interface Note {
    _id: string;
    heading: string;
    content: string;
}

interface UserState {
    user: User | null;
    workspace: Workspace[];
    notes: Note[];
    setUser: (user: User) => void;
    clearUser: () => void;
    addWorkspace: (workspace: Workspace) => void;
    setWorkspace: (workspaces: Workspace[]) => void;
    setNotes: (notes: Note[]) => void;
    addNote: (note: Note) => void;
}

const useUserStore = create<UserState>((set) => ({
    user: null,
    workspace: [],
    notes: [],
    setUser: (user: User) => set({ user }),
    clearUser: () => set({ user: null, workspace: [], notes: [] }),

    addWorkspace: (workspace: Workspace) =>
        set((state) => ({
            workspace: [...state.workspace, workspace],
        })),

    setWorkspace: (workspaces: Workspace[]) => set({ workspace: workspaces }),

    setNotes: (notes: Note[]) => set({ notes }),

    addNote: (note: Note) =>
        set((state) => ({
            notes: [...state.notes, note],
        })),
}));

export default useUserStore;
