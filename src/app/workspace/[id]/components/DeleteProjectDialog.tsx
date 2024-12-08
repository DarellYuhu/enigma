import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useDeleteProject from "@/hooks/features/workspace/useDeleteProject";
import { Trash } from "lucide-react";

type Params = {
  projectId: string;
  projectName: string;
  workspaceId: string;
};
const DeleteProjectDialog = (params: Params) => {
  const { mutateAsync, isPending } = useDeleteProject();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="absolute top-2 right-2">
        <Button variant="outline" size={"icon"}>
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {`This action cannot be undone. This will permanently delete this${(
              <span className="font-bold">({params.projectName})</span>
            )} card and it's content.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              mutateAsync({
                projectId: params.projectId,
                workspaceId: params.workspaceId,
              });
            }}
            disabled={isPending}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProjectDialog;
