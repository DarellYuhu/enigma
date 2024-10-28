import getProjectConfig from "@/api/youtube/getProjectConfig";
import patchProjectConfig from "@/api/youtube/patchProjectConfig";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import updateYoutube from "@/schemas/youtube/updateProject";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const EditDialog = ({ item }: { item: YoutubeProject }) => {
  const queryClient = useQueryClient();
  const updateForm = useForm<z.infer<typeof updateYoutube>>({
    resolver: zodResolver(updateYoutube),
    defaultValues: {
      projectId: "",
      APIs: "",
      keywords: "",
      languageCode: "",
      regionCode: "",
      runEvery: 0,
      getDetailsAfter: 0,
      monitorTopVideosEvery: 0,
      status: false,
    },
  });
  const projectConfig = useQuery({
    enabled: !!item.projectID,
    queryKey: ["youtube", "projects", item.projectID],
    queryFn: () => getProjectConfig(item.projectID),
  });
  const mutation = useMutation({
    mutationFn: patchProjectConfig,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["youtube", "projects"] });
      toast("Project created!", {
        position: "bottom-right",
        duration: 4000,
        icon: "🚀",
      });
    },
    onError(e) {
      toast.error(e.message ?? "Something went wrong!", {
        position: "bottom-right",
        duration: 5000,
        icon: "🚀",
      });
    },
  });
  const onSubmit = (values: z.infer<typeof updateYoutube>) =>
    mutation.mutate(values);
  useEffect(() => {
    if (projectConfig.data) {
      updateForm.reset({
        projectId: item.projectID,
        APIs: projectConfig.data.APIs,
        getDetailsAfter: projectConfig.data.getDetailsAfter,
        keywords: projectConfig.data.keywords,
        languageCode: projectConfig.data.languageCode,
        monitorTopVideosEvery: projectConfig.data.monitorTopVideosEvery,
        regionCode: projectConfig.data.regionCode,
        runEvery: projectConfig.data.runEvery,
        status: projectConfig.data.status === "active" ? true : false,
      });
    }
  }, [projectConfig.data]);
  return (
    <DialogContent className="max-h-screen overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Edit Project</DialogTitle>
      </DialogHeader>
      <Form {...updateForm}>
        <form
          onSubmit={updateForm.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <FormField
            control={updateForm.control}
            name="projectId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Project Id</FormLabel>
                <FormControl className="bg-slate-200 dark:bg-slate-600 text-sm p-2 rounded-sm">
                  <input {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={updateForm.control}
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
            control={updateForm.control}
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
            control={updateForm.control}
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
            control={updateForm.control}
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
            control={updateForm.control}
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
            control={updateForm.control}
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
            control={updateForm.control}
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
            <DialogClose className="bg-red-400 dark:bg-red-500 rounded-md shadow-md p-2 hover:bg-red-500 dark:hover:bg-red-700 transition-all ease-in-out duration-200">
              Cancel
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default EditDialog;
