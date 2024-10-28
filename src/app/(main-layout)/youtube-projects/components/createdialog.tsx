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
import createYoutube from "@/schemas/youtube/createProject";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import postProject from "@/api/youtube/postProject";
import { toast } from "sonner";
import { useRef } from "react";

const CreateDialog = () => {
  const queryClient = useQueryClient();
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const createForm = useForm<z.infer<typeof createYoutube>>({
    resolver: zodResolver(createYoutube),
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
  const mutation = useMutation({
    mutationFn: postProject,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["youtube", "projects"] });
      toast("Project created!", {
        position: "bottom-right",
        duration: 2000,
        icon: "🚀",
      });
      closeRef.current?.click();
    },
    onError(e) {
      toast.error(e.message ?? "Something went wrong!", {
        position: "bottom-right",
        duration: 5000,
        icon: "🚀",
      });
    },
  });
  const onSubmit = (values: z.infer<typeof createYoutube>) => {
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
