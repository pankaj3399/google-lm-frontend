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

interface Source {
    _id: string;
    url: string;
    summary: string;
    name: string;
}

interface UserState {
    user: User | null;
    workspace: Workspace[];
    notes: Note[];
    selectedNote: number;
    sources: Source[];
    setSelectedNote: (selectedNote: number) => void;
    setUser: (user: User) => void;
    clearUser: () => void;
    addWorkspace: (workspace: Workspace) => void;
    setWorkspace: (workspaces: Workspace[]) => void;
    setNotes: (notes: Note[]) => void;
    addNote: (note: Note) => void;
    setSource: (sources: Source[]) => void;
    addSource: (source: Source) => void;
}

const useUserStore = create<UserState>((set) => ({
    user: null,
    workspace: [],
    notes: [],
    selectedNote: -1,
    sources: [],

    setSelectedNote: (selectedNote: number) => set({ selectedNote }),
    setUser: (user: User) => set({ user }),
    clearUser: () => set({ user: null, workspace: [], notes: [], sources: [] }),

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

    setSource: (sources: Source[]) => set({ sources }),

    addSource: (source: Source) =>
        set((state) => ({
            sources: [...state.sources, source],
        })),
}));

export default useUserStore;
