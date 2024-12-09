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
import useUpdateUser from "@/hooks/features/user/useUpdateUser";
import updateUser from "@/schemas/account/updateUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { Role, User } from "@prisma/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const UpdateSheet = ({ user }: { user?: Omit<User, "password"> }) => {
  const { mutate } = useUpdateUser();
  const form = useForm<z.infer<typeof updateUser>>({
    resolver: zodResolver(updateUser),
  });
  const onSubmit = (values: z.infer<typeof updateUser>) => {
    mutate({ ...values, id: user?.id || 0 });
  };

  useEffect(() => {
    if (user) {
      form.reset({
        displayName: user.displayName,
        role: user.role,
        username: user.username,
      });
    }
  }, [user]);
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Update account data?</SheetTitle>
        <SheetDescription>Please fill all the available form</SheetDescription>
      </SheetHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
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
                    {Object.values(Role).map((role, index) => (
                      <SelectItem key={index} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <SheetFooter className="text-sm mt-4">
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
    </SheetContent>
  );
};

export default UpdateSheet;
