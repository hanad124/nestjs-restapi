import { useState, useTransition } from "react";

import { openNewBookMarkModal } from "@/store/bookmodal";
import { Dialog, DialogContent } from "../../ui/dialog";
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import Input from "../../Input";
import { FiLoader } from "react-icons/fi";
import { createBookMark } from "@/apicalls/bookmark";
import { useBookMark } from "@/store/bookmarkStore";

const NewBook = () => {
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { open, setOpen } = openNewBookMarkModal();
  const { fetchBookMarks } = useBookMark();

  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors, isLoading },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    startTransition(() => {
      createBookMark({
        title: data.title,
        description: data.description,
        link: data.link,
      })
        .then(() => {
          toast.success("BookMark created successfully!");
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
          <h1 className="font-semibold text-lg">Create New BookMark </h1>

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
                      <span>Saving Book</span>
                    </>
                  ) : (
                    "Save Book"
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

export default NewBook;
