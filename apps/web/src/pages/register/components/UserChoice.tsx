import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useRegisterPageState } from "../register-page.state";

export const UserChoice = () => {
  const { setUserType } = useRegisterPageState();

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-xl">Register as a</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="mt-4 flex h-full flex-col items-center justify-center gap-2 sm:flex-row">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setUserType("business")}
          >
            Business Entity
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setUserType("expert")}
          >
            Finance Expert
          </Button>
        </div>
        <div className="mt-12 text-center text-sm">
          Already have an account?{" "}
          <Link to={"/login"} className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
