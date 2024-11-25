import { useAuth } from "@/providers/Authentication";
import { Handshake } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { ProfileMenu } from "./ProfileMenu";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { session, isLoading } = useAuth();
  return (
    <div className="mx-auto min-h-screen max-w-6xl p-2 py-4">
      <div className="flex items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <Handshake className="size-6 text-primary" />
          <div className="text-2xl font-semibold">FinMatch</div>
        </Link>
        <div className="flex items-center gap-2">
          {!session && !isLoading && (
            <React.Fragment>
              <Link to={"/login"}>
                <Button>Login</Button>
              </Link>
              <Link to={"/register"}>
                <Button variant={"outline"}>Register</Button>
              </Link>
            </React.Fragment>
          )}
          {session && <ProfileMenu />}
          {isLoading && <Skeleton className="h-9 w-16" />}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};
