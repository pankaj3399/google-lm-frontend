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
    jsonDate: string
}

export interface Source {
    _id: string;
    url: string;
    summary: string;
    name: string;
    uploadType: string;
    updatedAt: string;
    createdAt: string;
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
    propertyId: boolean;
    setPropertyId: (propertyId: boolean) => void;
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
    deleteNote: (ids: string[]) => void;
    deleteSource: (id: string) => void;
    updateWorkspaceName: (id: string, name: string) => void;
    updateSourceName: (id: string, name: string) => void;
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
    propertyId: false,
    setPropertyId: (propertyId) => set(() => ({ propertyId })),
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
    deleteNote: (ids: string[]) =>
        set((state) => ({
            notes: state.notes.filter((note) => !ids.includes(note._id)),
        })),
    deleteSource: (id: string) =>
        set((state) => ({
            sources: state.sources.filter((source) => source._id !== id),
        })),
    updateWorkspaceName: (id: string, name: string) =>
        set((state) => ({
            workspace: state.workspace.map((ws) =>
                ws._id === id ? { ...ws, name } : ws
            ),
        })),
    updateSourceName: (id: string, name: string) =>
        set((state) => ({
            sources: state.sources.map((source) =>
                source._id === id ? { ...source, name } : source
            ),
        })),
}));

export default useUserStore;
