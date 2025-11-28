import LoginForm from "@/components/features/auth/LoginForm";
import RegisterForm from "@/components/features/auth/RegisterForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleAlertIcon } from "lucide-react";

export default function Auth() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-10">
      <Card className="w-[420px]">
        {/* <CardHeader>
          <CardTitle className="text-center">Authentication</CardTitle>
        </CardHeader> */}

        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-4">
              <Alert className="text-left mb-4 border-none bg-sky-600/10 text-sky-600 dark:bg-sky-400/10 dark:text-sky-400">
                <CircleAlertIcon />
                <AlertTitle>Note</AlertTitle>
                <AlertDescription className="text-sky-600/80 dark:text-sky-400/80">
                  This is a demo login form. You can use "username" and
                  "password" from the{" "}
                  <a
                    href="https://dummyjson.com/docs/auth"
                    target="_blank"
                    className="underline"
                  >
                    dummyjson.com
                  </a>
                </AlertDescription>
              </Alert>
              <LoginForm />
            </TabsContent>

            <TabsContent value="register" className="mt-4">
              <Alert className="text-left mb-4 border-none bg-sky-600/10 text-sky-600 dark:bg-sky-400/10 dark:text-sky-400">
                <CircleAlertIcon />
                <AlertTitle>Note</AlertTitle>
                <AlertDescription className="text-sky-600/80 dark:text-sky-400/80">
                  This is a demo registration form. Submitting the form will not
                  create an actual account.
                </AlertDescription>
              </Alert>

              <RegisterForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
