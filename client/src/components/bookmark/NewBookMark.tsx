import { Button } from "../ui/button";
import { FiPlus } from "react-icons/fi";

import { openNewBookMarkModal } from "@/store/bookmodal";
import NewBook from "./modals/NewBookMark";

const NewBookMark = () => {
  const { setOpen } = openNewBookMarkModal();

  return (
    <>
      <div className="flex items-center justify-between w-full ">
        <h1 className="text-2xl font-semibold text-slate-900">Book Marks</h1>
        <Button
          className="flex items-center gap-2 p-2 py-4"
          variant="default"
          color="primary"
          onClick={() => {
            setOpen(true);
          }}
        >
          <FiPlus className="text-lg" />
          <span>New Book Mark</span>
        </Button>
      </div>
      <NewBook />
    </>
  );
};

export default NewBookMark;
