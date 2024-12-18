"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { useFieldArray, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ColorPicker } from "@/components/ui/color-picker";
import { Button, buttonVariants } from "@/components/ui/button";
import { Pencil, Trash, UserPlus } from "lucide-react";
import WorkspaceSchema, { UpdateWorkspace } from "@/schemas/workspace";
import { useUsers } from "@/hooks/features/user/useUsers";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import useWorkspace from "@/hooks/features/workspace/useWorkspace";
import { useParams } from "next/navigation";
import isEqual from "lodash/isEqual";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdateWorkspace from "@/hooks/features/workspace/useUpdateWorkspace";

const EditWorkspaceSheet = () => {
  const [initValue, setInitValue] = useState<UpdateWorkspace | undefined>();
  const params: { id: string } = useParams();
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const { data } = useWorkspace(params.id);
  const users = useUsers();
  const { mutate, isPending } = useUpdateWorkspace();
  const form = useForm<UpdateWorkspace>({
    resolver: zodResolver(WorkspaceSchema.update),
    defaultValues: {
      bgColor: "",
      textColor: "",
      description: "",
      name: "",
      users: [{ id: "" }],
    },
  });
  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "users",
  });
  const onSubmit = (value: UpdateWorkspace) => {
    const keys = Object.keys(value).filter(
      (key) =>
        !isEqual(
          initValue?.[key as keyof UpdateWorkspace],
          value[key as keyof UpdateWorkspace]
        )
    );
    const changedField = keys.map((key) => [
      key,
      value[key as keyof UpdateWorkspace],
    ]);
    const payload = Object.fromEntries(changedField);
    mutate({ payload, id: params.id });
  };

  useEffect(() => {
    if (data) {
      const value = {
        bgColor: data.data.bgColor ?? "",
        textColor: data.data.textColor ?? "",
        description: data.data.description ?? "",
        name: data.data.name,
        users: data.data.Workspace_User.map((item) => ({
          id: item.userId.toString(),
        })),
      };
      form.reset(value);
      setInitValue(value);
    }
  }, [data]);

  return (
    <Sheet onOpenChange={(open) => !open && form.reset()}>
      <Tooltip>
        <TooltipTrigger asChild>
          <SheetTrigger
            aria-label="Edit workspace"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "size-8 rounded-lg"
            )}
          >
            <Pencil className="size-4" />
          </SheetTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>{"Edit workspace"}</p>
        </TooltipContent>
      </Tooltip>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Edit Workspace</SheetTitle>
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
            <div className="flex flex-row gap-4">
              <FormField
                control={form.control}
                name="textColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Text Color</FormLabel>
                    <FormControl>
                      <ColorPicker
                        value={field.value!}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bgColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Background Color</FormLabel>
                    <FormControl>
                      <ColorPicker
                        value={field.value!}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                Update
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

export default EditWorkspaceSheet;
