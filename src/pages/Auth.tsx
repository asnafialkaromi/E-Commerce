import Login from "@/components/forms/Login";
import Register from "@/components/forms/Register";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "sonner";

export default function Auth() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-10">
      <Toaster />
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
              <Login />
            </TabsContent>

            <TabsContent value="register" className="mt-4">
              <Register />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
