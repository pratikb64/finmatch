import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/providers/Authentication";
import { AsyncState } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { useLoginPageState } from "./login-page.state";
import { loginSchema } from "./loginSchema";

export const LoginPage = () => {
  const { fetchSession, isLoading, session } = useAuth();
  const { loginUser, asyncStates } = useLoginPageState();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const loadingToastId = toast.loading("Logging in...");
    try {
      await loginUser(values);
      await fetchSession();
      navigate("/");
      form.reset();
      toast.success("Logged in successfully", { id: loadingToastId });
    } catch (err: any) {
      toast.error(err.message, { id: loadingToastId });
    }
  };

  useEffect(() => {
    if (!isLoading && session) {
      navigate("/");
    }
  }, [isLoading, session]);

  return (
    <Layout>
      <div className="mt-8 flex w-full items-center justify-center px-4">
        <Card className="mx-auto w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={
                      asyncStates.loginUserAsyncState === AsyncState.PENDING ||
                      isLoading
                    }
                  >
                    Login
                  </Button>
                </div>
              </form>
            </Form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};
