import { create } from "zustand";
import { getAllBookMarks } from "@/apicalls/bookmark";

interface BookMark {
  title: string;
  description: string;
  link: string;
}

interface BookMarkProps {
  bookmark: BookMark;
  setBookmark: (data: any) => void;
  fetchBookMarks: () => Promise<void>;
}

export const useBookMark = create<BookMarkProps>((set) => ({
  bookmark: {
    title: "",
    description: "",
    link: "",
  },
  setBookmark: (bookmark) => set({ bookmark }),
  fetchBookMarks: async () => {
    const res = await getAllBookMarks();
    console.log(res);

    set({
      bookmark: res?.data,
    });
  },
}));

const initializeStore = async () => {
  useBookMark.getState().fetchBookMarks();
};

initializeStore();
