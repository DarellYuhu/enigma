"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as HookForm,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePutService } from "@/hooks/usePutService";
import { useServices } from "@/hooks/useServices";
import ServiceSchema from "@/schemas/service";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Form = () => {
  const services = useServices();
  const mutation = usePutService();
  const form = useForm<z.infer<typeof ServiceSchema.putServices>>({
    resolver: zodResolver(ServiceSchema.putServices),
    defaultValues: {
      youtube: {
        id: "youtube",
        url: "",
        type: "YOUTUBE",
      },
      tiktok: {
        id: "tiktok",
        url: "",
        type: "TIKTOK",
      },
    },
  });
  const onSubmit = (values: z.infer<typeof ServiceSchema.putServices>) => {
    mutation.mutate(values);
  };
  useEffect(() => {
    if (services.data) {
      form.reset(
        services.data.reduce((acc: { [key: string]: any }, curr) => {
          const {
            createdAt: _createdAt,
            updatedAt: _updatedAt,
            ...rest
          } = curr;
          acc[curr.id] = rest;
          return acc;
        }, {})
      );
    }
  }, services.data);
  return (
    <HookForm {...form}>
      <CardContent>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name={"youtube.url"}
            control={form.control}
            render={({ field }) => (
              <FormItem className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <FormLabel>Youtube</FormLabel>
                  <FormControl>
                    <Input placeholder="Youtube API URL" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name={"tiktok.url"}
            control={form.control}
            render={({ field }) => (
              <FormItem className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <FormLabel>Tiktok</FormLabel>
                  <FormControl>
                    <Input placeholder="Tiktok API URL" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <CardFooter className="flex items-center justify-end">
            <Button disabled={mutation.isPending} type="submit">
              Update
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </HookForm>
  );
};

export default Form;