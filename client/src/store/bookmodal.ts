import { create } from "zustand";

interface NewBookMarkModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const openNewBookMarkModal = create<NewBookMarkModalProps>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
}));

interface BookMarkIdProps {
  id: string;
  setId: (id: string) => void;
}

export const BookMarkId = create<BookMarkIdProps>((set) => ({
  id: "",
  setId: (id: string) => set({ id }),
}));
