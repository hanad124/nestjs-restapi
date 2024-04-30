import { useNavigate } from "react-router-dom";

import { Button } from "../ui/button";
import { FiLogOut, FiPlus, FiSettings } from "react-icons/fi";
import { openNewBookMarkModal } from "@/store/bookmodal";
import NewBook from "./modals/NewBookMark";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { BiUserCircle } from "react-icons/bi";

import { userStore } from "@/store/userStore";
import { message } from "antd";

const NewBookMark = () => {
  const { setOpen } = openNewBookMarkModal();
  const { data } = userStore();

  const navigate = useNavigate();

  const fullname = data?.firstName + " " + data?.lastName;

  let initials = "";
  if (fullname) {
    const words = fullname.split(/\s+/);

    if (words.length > 0) {
      initials = words
        .slice(0, 2)
        .map((word: string) => word.charAt(0).toUpperCase())
        .join("");
    }
  }

  return (
    <>
      <div className="flex justify-between items-center py-[1rem] px-[1rem] md:px-[15rem] bg-slate-200/30">
        <div className="font-bold text-xl">BookMark Manager</div>
        <div className="">
          <DropdownMenu>
            <DropdownMenuTrigger className="">
              <div className=" border-slate-400 border-[1px] dark:border-slate-600 dark:border-[1px] rounded-full p-[1.4px]">
                <Avatar>
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>{" "}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full min-w-56 border-[.7px] dark:border-slate-700">
              <DropdownMenuItem
                onClick={() => {
                  // setOpenUserProfileModal(true);
                }}
                className="flex cursor-pointer items-center text-slate-600 dark:text-slate-400 gap-1"
              >
                <BiUserCircle className="w-8 h-8 text-slate-500 " />

                <div className="flex flex-col gap-1">
                  <span className=" ">{data && fullname}</span>
                  <span className="text-xs">{data && data?.email}</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigate("")}
                className="flex gap-1 cursor-pointer items-center text-slate-600 dark:text-slate-400"
              >
                <FiSettings className="w-6 font-bold text-lg" />
                <span> Settings</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  message.loading("Logging out...", 0.5);
                  setTimeout(() => {
                    message.success("You Logged Out Successfully");
                    localStorage.removeItem("token");
                    navigate("/login");
                    // setTheme("light");
                  }, 500);
                }}
                className="flex gap-1 cursor-pointer items-center text-slate-600 dark:text-slate-400"
              >
                <FiLogOut className="w-6 font-bold text-lg" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="mt-10 px-[1rem] md:px-[15rem] flex items-center justify-between w-full ">
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
