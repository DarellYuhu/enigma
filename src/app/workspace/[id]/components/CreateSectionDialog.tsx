"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useCreateSection from "@/hooks/features/workspace/useCreateSection";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FolderPlusIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const create = z.object({
  name: z.string().trim().min(1, "Required"),
  workspaceId: z.string().trim().min(1, "Required"),
});

const CreateSectionDialog = () => {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const params = useParams<{ id: string }>();
  const form = useForm<z.infer<typeof create>>({
    resolver: zodResolver(create),
    defaultValues: {
      name: "",
      workspaceId: params.id,
    },
  });

  const { mutate, status, isPending } = useCreateSection();

  useEffect(() => {
    if (status === "success") closeRef.current?.click();
  }, [status]);

  return (
    <Dialog onOpenChange={(open) => !open && form.reset()}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger
            aria-label="Create new section"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "size-8 rounded-lg"
            )}
          >
            <FolderPlusIcon className="size-4" />
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>{"Create new section"}</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Section</DialogTitle>
          <DialogDescription>
            Create new section to organize your card
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => mutate(data))}
            className="space-y-4"
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="submit"
                className={buttonVariants()}
                disabled={isPending}
              >
                Create
              </Button>
              <DialogClose
                ref={closeRef}
                type="button"
                className={buttonVariants({ variant: "outline" })}
              >
                Close
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSectionDialog;
