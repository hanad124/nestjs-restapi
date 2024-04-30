import { useEffect } from "react";

import { FiEdit3, FiTrash } from "react-icons/fi";

import NewBookMark from "./NewBookMark";
import DataTable from "./Table";
import { columns } from "../columns";
import { Button } from "../ui/button";
import { useBookMark } from "@/store/bookmarkStore";

const Bookmark = () => {
  const { bookmark } = useBookMark();

  const actionColumn: any = {
    id: "action",
    header: "Action",
    width: "100px",
    cell: ({ row }: any) => {
      const invoice = row.original;
      return (
        <div className="flex items-center justify-center space-x-1">
          <Button
            variant="ghost"
            color="primary"
            onClick={() => {
              // setOpen(true);
              //   setId(invoice.id);
            }}
          >
            <FiEdit3 className="text-lg" />
          </Button>
          <Button
            variant="ghost"
            color="primary"
            onClick={() => {
              //   deleteInvoiceHandler(invoice.id);
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
      <div className="flex flex-col justify-center items-center mt-20 w-full md:max-w-[50rem] mx-4 md:mx-auto">
        <NewBookMark />
        <div className="w-full my-10">
          <DataTable
            data={bookmark.data}
            columns={columns.concat(actionColumn)}
          />
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
