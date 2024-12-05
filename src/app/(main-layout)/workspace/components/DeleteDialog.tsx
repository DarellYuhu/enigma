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
import { buttonVariants } from "@/components/ui/button";
import useDeleteWorkspace from "@/hooks/features/workspace/useDeleteWorkspace";
import { TWorkspace } from "@/hooks/features/workspace/useWorkspaces";
import { Trash } from "lucide-react";
import { useState } from "react";

const DeleteDialog = ({ workspace }: { workspace: TWorkspace["0"] }) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useDeleteWorkspace();
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        className={buttonVariants({ variant: "outline", size: "icon" })}
      >
        <Trash />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {`This action cannot be undone. This will permanently delete this ${(
              <span className="font-bold">({workspace.name})</span>
            )} workspace andit's content`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              mutateAsync(workspace.id).then(() => setOpen(false));
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

export default DeleteDialog;
