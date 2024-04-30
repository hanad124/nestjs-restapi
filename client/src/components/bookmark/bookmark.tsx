import { FiEdit3, FiTrash } from "react-icons/fi";

import NewBookMark from "./NewBookMark";
import DataTable from "./Table";
import { columns } from "../columns";
import { Button } from "../ui/button";
import { useBookMark } from "@/store/bookmarkStore";
import toast, { Toaster } from "react-hot-toast";
import { deleteBookMark } from "@/apicalls/bookmark";
import { OpenUpdateBookMarkModal, UseBookMarkId } from "@/store/bookmodal";
import UpdateBookMark from "./modals/UpdateBookMark";

const Bookmark = () => {
  const { bookmark, fetchBookMarks } = useBookMark();
  const { setOpen } = OpenUpdateBookMarkModal();
  const { setId } = UseBookMarkId();

  const deleteInvoiceHandler = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;

    toast.promise(deleteBookMark(id), {
      loading: "Deleting invoice...",
      success: "Invoice deleted successfully",
      error: "Error deleting invoice",
    });
    fetchBookMarks();
  };

  const actionColumn: any = {
    id: "action",
    header: "Action",
    width: "100px",
    cell: ({ row }: any) => {
      const bookmark = row.original;
      return (
        <div className="flex items-center justify-center space-x-1">
          <Button
            variant="ghost"
            color="primary"
            onClick={() => {
              setOpen(true);
              setId(bookmark.id);
            }}
          >
            <FiEdit3 className="text-lg" />
          </Button>
          <Button
            variant="ghost"
            color="primary"
            onClick={() => {
              deleteInvoiceHandler(bookmark.id);
              fetchBookMarks();
            }}
          >
            <FiTrash className="text-lg" />
          </Button>
        </div>
      );
    },
  };
  return (
    <div>
      <NewBookMark />
      <div className="flex flex-col justify-center items-center mt-10 w-full md:max-w-[50rem] mx-4 md:mx-auto">
        <div className="w-full">
          <DataTable
            data={bookmark.data}
            columns={columns.concat(actionColumn)}
          />
        </div>
      </div>
      <Toaster />
      <UpdateBookMark />
    </div>
  );
};

export default Bookmark;
