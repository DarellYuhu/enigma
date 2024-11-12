import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TiktokSchema from "@/schemas/tiktok";
import { z } from "zod";
import useCreateTWProject from "@/hooks/useCreateTWProject";

const CreateNewDialog = () => {
  const createForm = useForm<z.infer<typeof TiktokSchema.create>>({
    resolver: zodResolver(TiktokSchema.create),
    defaultValues: {
      projectName: "",
      keywords: "",
    },
  });
  const { mutate } = useCreateTWProject();

  const onSubmit = (values: z.infer<typeof TiktokSchema.create>) => {
    mutate(values);
  };

  return (
    <DialogContent className="bg-white dark:bg-slate-800 border-0">
      <DialogHeader>
        <DialogTitle>Create New Project</DialogTitle>
      </DialogHeader>
      <Form {...createForm}>
        <form
          onSubmit={createForm.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <FormField
            control={createForm.control}
            name="projectName"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Project Name</FormLabel>
                <FormControl className="bg-slate-200 dark:bg-slate-600 text-sm p-2 rounded-sm">
                  <input placeholder="Type here the name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createForm.control}
            name="keywords"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Keywords</FormLabel>
                <FormControl className="bg-slate-200 dark:bg-slate-600 text-sm p-2 rounded-sm">
                  <textarea
                    rows={4}
                    placeholder="Type here the keywords"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Seperate by comma (,)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="text-sm">
            <button
              type="submit"
              className="bg-green-400 dark:bg-green-500 rounded-md shadow-md p-2 hover:bg-green-500 dark:hover:bg-green-700 transition-all ease-in-out duration-200"
            >
              Submit
            </button>
            <DialogClose className="bg-red-400 dark:bg-red-500 rounded-md shadow-md p-2 hover:bg-red-500 dark:hover:bg-red-700 transition-all ease-in-out duration-200">
              Cancel
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default CreateNewDialog;
