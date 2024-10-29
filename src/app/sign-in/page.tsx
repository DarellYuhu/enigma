import { auth, signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

const SignIn = async (props: {
  searchParams: { callbackUrl: string | undefined; error: string | undefined };
}) => {
  const session = await auth();
  if (session?.user) redirect("/");
  return (
    <div
      className="w-screen h-screen flex justify-center items-center"
      style={{
        backgroundImage: "url('/login-bg.jpg')",
        backgroundSize: "cover",
      }}
    >
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your username and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={async (formData) => {
              "use server";
              try {
                await signIn("credentials", {
                  username: formData.get("username"),
                  password: formData.get("password"),
                  redirectTo: "/",
                });
              } catch (error) {
                if (error instanceof AuthError) {
                  return redirect(`/sign-in?error=${error.type}`);
                }
                throw error;
              }
            }}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input name="username" id="username" type="username" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              {props.searchParams.error && (
                <p className="text-red-500 text-sm">
                  Wrong username or password
                </p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
