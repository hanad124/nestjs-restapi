import { useEffect, useTransition } from "react";

import { OpenUpdateBookMarkModal, UseBookMarkId } from "@/store/bookmodal";
import { Dialog, DialogContent } from "../../ui/dialog";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import Input from "../../Input";
import { FiLoader } from "react-icons/fi";
import {
  createBookMark,
  getSingleBookMark,
  updateBookMark,
} from "@/apicalls/bookmark";
import { useBookMark } from "@/store/bookmarkStore";

const UpdateBookMark = () => {
  const [isPending, startTransition] = useTransition();

  const { open, setOpen } = OpenUpdateBookMarkModal();
  const { fetchBookMarks } = useBookMark();
  const { id } = UseBookMarkId();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {},
  });

  useEffect(() => {
    const getBookMark = async () => {
      const res = await getSingleBookMark(id);
      setValue("title", res?.data?.data?.title);
      setValue("description", res?.data?.data?.description);
      setValue("link", res?.data?.data?.link);
    };

    if (id) {
      getBookMark();
    }
  }, [open]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    startTransition(() => {
      updateBookMark(
        {
          title: data.title,
          description: data.description,
          link: data.link,
        },
        id
      )
        .then(() => {
          toast.success("BookMark updated successfully!");
          setOpen(false);
          reset();
          fetchBookMarks();
        })
        .catch((err) => {
          console.log(err);
          toast.error("An error occurred!");
        });
    });
  };

  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={(open) => {
          setOpen(open);

          if (!open) {
            reset();
          }
        }}
      >
        <DialogContent className="sm:max-w-fit md:min-w-[40rem]">
          <h1 className="font-semibold text-lg">Update BookMark </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="relative">
            <div className="grid grid-cols-12 gap-4 mt-6">
              <div className="col-span-12 sm:col-span-6">
                <Input
                  label="Title"
                  id="title"
                  required
                  register={register}
                  errors={errors}
                />
              </div>
              <div className="col-span-12 sm:col-span-6">
                <Input
                  label="Description"
                  id="description"
                  required
                  register={register}
                  errors={errors}
                />
              </div>
              <div className="col-span-12 sm:col-span-6">
                <Input
                  label="Link"
                  id="link"
                  required
                  register={register}
                  errors={errors}
                />
              </div>
              <div className="col-span-12">
                <button
                  type="submit"
                  disabled={isPending}
                  className={`flex items-center justify-center gap-2 p-2 bg-primary text-white rounded-full w-full px-4 ${
                    isPending && "cursor-not-allowed bg-primary/60"
                  }`}
                >
                  {isPending ? (
                    <>
                      <FiLoader className="animate-spin" />
                      <span>Updating Book</span>
                    </>
                  ) : (
                    "update Book"
                  )}
                </button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  );
};

export default UpdateBookMark;
