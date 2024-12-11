import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useApi from "@/hooks/useApi";
import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";

// ! schema
const schema = z.object({
  id: z.string().min(1, "ID is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  // ! hooks
  const [isPending, setPending] = useState(false);
  const apiRequest = useApi();

  // ! form
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  // ! form submit handler
  const onSubmit = async (inputData: z.infer<typeof schema>) => {
    setPending(true);
    try {
      const { data } = await apiRequest.post("/login", inputData);

      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setPending(false);
    }
  };

  return (
    <section className="py-32">
      <div className="container">
        <div className="flex flex-col gap-4">
          <Card className="mx-auto w-full max-w-md">
            <CardHeader className="items-center">
              <AiOutlineUser className="size-10 rounded-full bg-accent p-2.5 text-muted-foreground" />
              <CardTitle className="text-xl">Log in with your email</CardTitle>
              <CardDescription>Enter your information to login</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <fieldset className="grid gap-4" disabled={isPending}>
                    <FormField
                      control={form.control}
                      name="id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ID</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your ID" {...field} />
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
                          <div className="flex justify-between">
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Link to="#" className="text-sm underline">
                              Forgot password
                            </Link>
                          </div>
                          <FormControl>
                            <Input
                              placeholder="Enter your password"
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      Log in
                      {isPending && (
                        <ImSpinner8 className="animate-spin ml-1" />
                      )}
                    </Button>
                  </fieldset>
                </form>
              </Form>
            </CardContent>
          </Card>
          <div className="mx-auto flex gap-1 text-sm">
            <p>Don&apos;t have an account yet?</p>
            <Link to="/auth/register" className="underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
