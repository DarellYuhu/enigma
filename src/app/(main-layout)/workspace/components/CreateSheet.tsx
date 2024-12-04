"use client";
import { Button, buttonVariants } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import useCreateWorkspace from "@/hooks/features/workspace/useCreateWorkspace";
import { useUsers } from "@/hooks/useUsers";
import { cn } from "@/lib/utils";
import WorkspaceSchema from "@/schemas/workspace";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash, UserPlus } from "lucide-react";
import { useEffect, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const CreateSheet = () => {
  const users = useUsers();
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const form = useForm<z.infer<typeof WorkspaceSchema.create>>({
    resolver: zodResolver(WorkspaceSchema.create),
    defaultValues: {
      name: "",
      description: "",
      users: [{ id: "" }],
    },
  });
  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "users",
  });
  const { mutate, isPending, status } = useCreateWorkspace();

  const onSubmit = (values: z.infer<typeof WorkspaceSchema.create>) =>
    mutate(values);

  useEffect(() => {
    if (status === "success") {
      closeRef.current?.click();
    }
  }, [status]);

  return (
    <Sheet onOpenChange={(open) => !open && form.reset()}>
      <SheetTrigger className={cn(buttonVariants(), "flex justify-self-end")}>
        Create Workspace
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Workspace</SheetTitle>
          <SheetDescription>
            Please fill all the available form
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workspace Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-1">
              <FormLabel>Workspace Manager</FormLabel>
              {fields.map((field, index) => (
                <div className="flex flex-row gap-2" key={index}>
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`users.${index}.id`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select user" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {users?.data?.map((user, index) => (
                              <SelectItem
                                value={user.id.toString()}
                                key={index}
                              >
                                {user.displayName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant={"destructive"}
                    onClick={() => remove(index)}
                  >
                    <Trash />
                  </Button>
                </div>
              ))}
            </div>
            <FormMessage>
              {form.formState.errors?.users?.root?.message}
            </FormMessage>
            <Button
              type="button"
              variant={"secondary"}
              onClick={() => append({ id: "" })}
              className="flex justify-self-end"
            >
              <UserPlus />
            </Button>

            <SheetFooter className="justify-self-start">
              <Button type="submit" disabled={isPending}>
                Create
              </Button>
              <SheetClose
                ref={closeRef}
                className={buttonVariants({ variant: "outline" })}
              >
                Cancel
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default CreateSheet;
