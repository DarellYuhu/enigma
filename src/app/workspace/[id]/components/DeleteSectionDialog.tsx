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
import useDeleteSection from "@/hooks/features/workspace/useDeleteSection";
import { Section } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useRef } from "react";

const DeleteSectionDialog = ({
  section,
}: {
  section: Pick<Section, "id" | "name"> & { workspaceId: string };
}) => {
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useDeleteSection();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size={"icon"}>
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {`This action cannot be undone. This will permanently delete this ${(
              <span className="font-bold">({section.name})</span>
            )} section and it's content.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel ref={cancelRef}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              mutateAsync(String(section.id)).then(() => {
                queryClient.invalidateQueries({
                  queryKey: ["workspace", section.workspaceId],
                });
                cancelRef.current?.click();
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

export default DeleteSectionDialog;
