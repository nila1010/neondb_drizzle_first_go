import { addUser } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { redirect } from "next/navigation";

export default async function Home() {
  async function signUpHandler(formData: FormData) {
    "use server";

    const returnUserId = await addUser(formData.get("usernamecreate") as string, formData.get("passwordcreate") as string);
    redirect(`/todolist?username=${returnUserId}`);
  }

  return (
    <Tabs
      defaultValue="login"
      className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="create">Create account</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Login to access your todo-list</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                name="username"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Login</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="create">
        <form action={signUpHandler}>
          <Card>
            <CardHeader>
              <CardTitle>Create account</CardTitle>
              <CardDescription>Create account to make a todo-list</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="usernamecreate">Username</Label>
                <Input
                  id="usernamecreate"
                  type="text"
                  name="usernamecreate"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="passwordcreate">Password</Label>
                <Input
                  id="passwordcreate"
                  type="password"
                  name="passwordcreate"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Create account</Button>
            </CardFooter>
          </Card>
        </form>
      </TabsContent>
    </Tabs>
  );
}
