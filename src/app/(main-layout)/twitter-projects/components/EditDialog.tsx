import { Switch } from "@/components/ui/switch";
import { useEffect } from "react";
import { useTiktokProject } from "@/hooks/useTiktokProject";
import { useEditTTProject } from "@/hooks/useEditTTProject";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TiktokSchema from "@/schemas/tiktok";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Clipboard } from "lucide-react";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useTwitterInfo from "@/hooks/useTwitterInfo";
import useEditTWProject from "@/hooks/useEditTWProject";

const EditDialog = ({ projectId }: { projectId?: string }) => {
  const projectQuery = useTwitterInfo(projectId);
  const projectMutation = useEditTWProject();
  const updateForm = useForm<z.infer<typeof TiktokSchema.update>>({
    resolver: zodResolver(TiktokSchema.update),
    defaultValues: {
      keywords: "",
      projectId: "",
      status: true,
      currentKeywords: "",
    },
  });
  const onEditSubmit = (values: z.infer<typeof TiktokSchema.update>) => {
    delete values.currentKeywords;
    const normalize: EditProjectPayload = {
      ...values,
      projectId,
      status: values.status ? "active" : "inactive",
    };
    projectMutation.mutate(normalize);
  };

  useEffect(() => {
    if (projectQuery.data) {
      updateForm.reset({
        keywords: "",
        projectId: projectQuery.data.projectId,
        status: projectQuery.data.status === "active",
        currentKeywords: projectQuery.data.keywords,
      });
    }
  }, [projectQuery.data]);

  if (projectQuery.status === "pending") {
    return (
      <DialogContent>
        <div>Loading...</div>
      </DialogContent>
    );
  }
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Project</DialogTitle>
      </DialogHeader>
      <Form {...updateForm}>
        <form
          onSubmit={updateForm.handleSubmit(onEditSubmit)}
          className="space-y-4"
        >
          <FormField
            control={updateForm.control}
            name="projectId"
            disabled
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Project Id</FormLabel>
                <FormControl className="bg-slate-200 disabled:bg-slate-300 dark:bg-slate-600 text-sm p-2 rounded-sm">
                  <input placeholder="Do not change!!" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={updateForm.control}
            name="currentKeywords"
            disabled
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Current Keywords</FormLabel>
                <FormControl className="bg-slate-300 dark:bg-slate-600 text-sm p-2 rounded-sm">
                  <div className="relative">
                    <input
                      disabled
                      placeholder="Do not change!!"
                      className="disabled:bg-slate-300 w-11/12 overflow-x-scroll"
                      {...field}
                    />
                    <button
                      type="button"
                      className="bg-slate-400 hover:bg-slate-500  p-1 mr-3 rounded-sm absolute right-0"
                      onClick={() =>
                        navigator.clipboard.writeText(field.value || "")
                      }
                    >
                      <Clipboard width={14} height={14} />
                    </button>
                  </div>
                </FormControl>
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
          <FormField
            control={updateForm.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
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
