import { ColumnDef } from "@tanstack/react-table";
import getShortId from "@/helpers/getShortId";

import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

export type BookMark = {
  id: string;
  title: string;
  description: string;
  link: string;
};

export const columns: ColumnDef<BookMark>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const bookmark = row.original;
      return <div className="font-medium">#{getShortId(bookmark.id)}</div>;
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "link",
    header: "Link",
  },
];
