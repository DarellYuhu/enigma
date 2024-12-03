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

const CreateSheet = () => {
  const form = useForm<z.infer<typeof ProjectSchema.create>>({
    defaultValues: {
      description: "",
      links: [{ label: "", url: "" }],
      sectionId: "",
      title: "",
      workspaceId: "",
    },
  });
  const { fields: _ } = useFieldArray({
    control: form.control,
    name: "links",
  });
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Create Card?</SheetTitle>
        <SheetDescription>Please fill all the available form</SheetDescription>
      </SheetHeader>
      <Form {...form}>
        <form className="space-y-4">
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
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {/* {Object.values(Role).map((role, index) => (
                      <SelectItem key={index} value={role}>
                        {role}
                      </SelectItem>
                    ))} */}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* {fields.map((field, index) => (
            <FormField
              control={form.control}
              name={field.id}
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
          ))} */}
          <SheetFooter className="text-sm mt-4">
            <button
              type="submit"
              className="bg-blue-400 dark:bg-blue-500 rounded-md shadow-md p-2 hover:bg-green-500 dark:hover:bg-green-700 transition-all ease-in-out duration-200"
            >
              Add Link
            </button>
            <button
              type="submit"
              className="bg-green-400 dark:bg-green-500 rounded-md shadow-md p-2 hover:bg-green-500 dark:hover:bg-green-700 transition-all ease-in-out duration-200"
            >
              Submit
            </button>
            <SheetClose className="bg-red-400 dark:bg-red-500 rounded-md shadow-md p-2 hover:bg-red-500 dark:hover:bg-red-700 transition-all ease-in-out duration-200">
              Cancel
            </SheetClose>
          </SheetFooter>
        </form>
      </Form>
      {/* <ColorPicker color="blue" onChange={(value) => console.log(value)} /> */}
    </SheetContent>
  );
};

export default CreateSheet;
