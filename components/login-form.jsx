"use client";

import { useState } from "react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function LoginForm({ className, ...props }) {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden backdrop-blur-3xl p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-8 md:p-12">
            <FieldGroup className="gap-6">
              {/* Titre dynamique */}
              <div className="flex flex-col items-center gap-2 text-center pb-2">
                <h1 className="text-3xl font-bold">
                  {isSignUp ? "Create account" : "Welcome back"}
                </h1>
                <p className="text-balance text-muted-foreground">
                  {isSignUp
                    ? "Sign up for Palette"
                    : "Login to your Palette account"}
                </p>
              </div>

              {/* Champ Nom (uniquement si Inscription) */}
              {isSignUp && (
                <Field>
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="h-11"
                    required
                  />
                </Field>
              )}

              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="h-11"
                  required
                />
              </Field>

              {/* Password */}
              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  {!isSignUp && (
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-2 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  className="h-11"
                  required
                />
              </Field>

              {/* Bouton Submit principal */}
              <Field>
                <Button type="submit" className="h-11 w-full text-base">
                  {isSignUp ? "Sign up" : "Login"}
                </Button>
              </Field>

              {/* Bouton Google (conservé pour les deux modes) */}
              <Field className="grid grid-cols-1 gap-4">
                <Button variant="outline" type="button" className="h-11">
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">
                    {isSignUp ? "Sign up with Google" : "Login with Google"}
                  </span>
                </Button>
              </Field>

              {/* Bouton pour switcher entre Login et Sign Up */}
              <FieldDescription className="text-center">
                {isSignUp
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="underline underline-offset-4 hover:text-primary font-medium"
                >
                  {isSignUp ? "Login" : "Sign up"}
                </button>
              </FieldDescription>
            </FieldGroup>
          </form>

          {/* Image à droite */}
          <div className="relative hidden bg-muted md:block">
            <img
              src="/mockup.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
