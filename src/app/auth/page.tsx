"use client";

import React from "react";
import { FaGoogle } from "react-icons/fa";

import { signIn } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
export default function Auth() {
  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/" });
  };
  return (
    <div>
      <div className="flex min-h-screen items-center justify-center bg-green-100">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              type="button"
              className="w-full"
              onClick={handleGoogleSignIn}
            >
              <FaGoogle className="mr-2 h-4 w-4" />
              Sign in with Google
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
