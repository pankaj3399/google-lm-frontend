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
    updatedAt: string;
    createdAt: string;
    type: string;
}

interface Source {
    _id: string;
    url: string;
    summary: string;
    name: string;
    uploadType: string;
}

interface UserState {
    user: User | null;
    workspace: Workspace[];
    notes: Note[];
    selectedNote: number;
    integrationPopup: boolean;
    sourcePopup: boolean;
    sources: Source[];
    openAiKey: boolean;
    googleAnalytics: boolean;
    setOpenAiKey: (openAiKey: boolean) => void;
    setGoogleAnalytics: (googleAnalytics: boolean) => void;
    setIntegrationPopup: () => void;
    setSourcePopup: () => void;
    setSelectedNote: (selectedNote: number) => void;
    setUser: (user: User) => void;
    clearUser: () => void;
    addWorkspace: (workspace: Workspace) => void;
    setWorkspace: (workspaces: Workspace[]) => void;
    setNotes: (notes: Note[]) => void;
    addNote: (note: Note) => void;
    updateNote: (index: number, updatedNote: Note) => void;
    setSource: (sources: Source[]) => void;
    addSource: (source: Source) => void;
}

const useUserStore = create<UserState>((set) => ({
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user") as string)
        : null,
    workspace: [],
    notes: [],
    selectedNote: -1,
    sources: [],
    integrationPopup: false,
    sourcePopup: false,
    openAiKey: false,
    googleAnalytics: false,
    setOpenAiKey: (openAiKey) => set(() => ({ openAiKey })),
    setGoogleAnalytics: (googleAnalytics) => set(() => ({ googleAnalytics })),
    setIntegrationPopup: () =>
        set((state) => ({
            integrationPopup: !state.integrationPopup,
        })),
    setSourcePopup: () =>
        set((state) => ({
            sourcePopup: !state.sourcePopup,
        })),
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

    updateNote: (index: number, updatedNote: Note) =>
        set((state) => ({
            notes: state.notes.map((note, i) =>
                i === index ? updatedNote : note
            ),
        })),

    setSource: (sources: Source[]) => set({ sources }),

    addSource: (source: Source) =>
        set((state) => ({
            sources: [...state.sources, source],
        })),
}));

export default useUserStore;
