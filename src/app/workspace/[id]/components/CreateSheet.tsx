"use client";
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
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import ProjectSchema from "@/schemas/project";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import CreateSectionDialog from "./CreateSectionDialog";
import useSections from "@/hooks/features/workspace/useSections";
import { useParams } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import useCreateProject from "@/hooks/features/workspace/useCreateProject";

const CreateSheet = () => {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const params = useParams<{ id: string }>();
  const workspaceId = params.id;
  const sections = useSections(workspaceId);
  const form = useForm<z.infer<typeof ProjectSchema.create>>({
    resolver: zodResolver(ProjectSchema.create),
    defaultValues: {
      description: "",
      links: [{ label: "", url: "" }],
      sectionId: "",
      title: "",
      workspaceId,
      image: new File([], ""),
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "links",
  });
  const { mutate, isPending } = useCreateProject();

  return (
    <SheetContent className="space-y-8 overflow-y-auto">
      <SheetHeader>
        <SheetTitle>Create Card?</SheetTitle>
        <SheetDescription>Please fill all the available form</SheetDescription>
      </SheetHeader>
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit((value) => mutate(value))}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
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
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card Image</FormLabel>
                <FormControl>
                  <Input
                    multiple={false}
                    className="pe-3 file:me-3 file:border-0 file:border-e h-fit p-2"
                    type="file"
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sectionId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Section</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Section" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sections.data?.map((selection) => (
                      <SelectItem
                        key={selection.id}
                        value={selection.id.toString()}
                      >
                        {selection.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <CreateSectionDialog />
          <div className="space-y-4">
            <FormLabel>Links</FormLabel>
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-2">
                <div className="flex flex-row gap-2">
                  <FormField
                    control={form.control}
                    name={`links.${index}.label`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input {...field} placeholder="Label" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="flex justify-self-end"
                    type="button"
                    variant={"destructive"}
                    onClick={() => remove(index)}
                  >
                    <Trash />
                  </Button>
                </div>
                <FormField
                  control={form.control}
                  name={`links.${index}.url`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="url" {...field} placeholder="https://" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
            <Button
              variant={"outline"}
              type="button"
              size={"sm"}
              onClick={() => append({ label: "", url: "" })}
            >
              Add Link
            </Button>
          </div>

          <SheetFooter className="text-sm mt-4">
            <Button
              type="submit"
              className={buttonVariants()}
              disabled={isPending}
            >
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
  );
};

export default CreateSheet;
