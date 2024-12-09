import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRef } from "react";
import { useCreateYTProject } from "@/hooks/features/youtube/useCreateYTProject";
import YoutubeSchema from "@/schemas/youtube";

const CreateDialog = () => {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const createForm = useForm<z.infer<typeof YoutubeSchema.create>>({
    resolver: zodResolver(YoutubeSchema.create),
    defaultValues: {
      APIs: "",
      keywords: "",
      languageCode: "",
      projectName: "",
      regionCode: "",
      backtrackSince: 0,
      runEvery: 0,
      getDetailsAfter: 0,
      monitorTopVideosEvery: 0,
    },
  });
  const mutation = useCreateYTProject({ closeRef });
  const onSubmit = (values: z.infer<typeof YoutubeSchema.create>) => {
    mutation.mutate(values);
  };
  return (
    <DialogContent className="bg-white dark:bg-slate-800 border-0 overflow-y-auto max-h-screen">
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
                  <input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createForm.control}
            name="APIs"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>API Youtube</FormLabel>
                <FormControl className="bg-slate-200 dark:bg-slate-600 text-sm p-2 rounded-sm">
                  <input {...field} />
                </FormControl>
                <FormDescription>Seperate by comma (,)</FormDescription>
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
                  <input {...field} />
                </FormControl>
                <FormDescription>Seperate by comma (,)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createForm.control}
            name="languageCode"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Language Code</FormLabel>
                <FormControl className="bg-slate-200 dark:bg-slate-600 text-sm p-2 rounded-sm">
                  <input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createForm.control}
            name="regionCode"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Region Code</FormLabel>
                <FormControl className="bg-slate-200 dark:bg-slate-600 text-sm p-2 rounded-sm">
                  <input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createForm.control}
            name="backtrackSince"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Backtrack Since (days)</FormLabel>
                <FormControl className="bg-slate-200 dark:bg-slate-600 text-sm p-2 rounded-sm">
                  <input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createForm.control}
            name="runEvery"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Run Every (hours)</FormLabel>
                <FormControl className="bg-slate-200 dark:bg-slate-600 text-sm p-2 rounded-sm">
                  <input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createForm.control}
            name="getDetailsAfter"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Get commentar after video upload (hours)</FormLabel>
                <FormControl className="bg-slate-200 dark:bg-slate-600 text-sm p-2 rounded-sm">
                  <input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createForm.control}
            name="monitorTopVideosEvery"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Video Monitoring Every (hours)</FormLabel>
                <FormControl className="bg-slate-200 dark:bg-slate-600 text-sm p-2 rounded-sm">
                  <input type="number" {...field} />
                </FormControl>
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
            <DialogClose
              ref={closeRef}
              className="bg-red-400 dark:bg-red-500 rounded-md shadow-md p-2 hover:bg-red-500 dark:hover:bg-red-700 transition-all ease-in-out duration-200"
            >
              Cancel
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default CreateDialog;
