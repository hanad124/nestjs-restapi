import { create } from "zustand";

interface BookMarkModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const openNewBookMarkModal = create<BookMarkModalProps>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
}));

export const OpenUpdateBookMarkModal = create<BookMarkModalProps>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
}));

interface BookMarkIdProps {
  id: string;
  setId: (id: string) => void;
}

export const UseBookMarkId = create<BookMarkIdProps>((set) => ({
  id: "",
  setId: (id: string) => set({ id }),
}));
