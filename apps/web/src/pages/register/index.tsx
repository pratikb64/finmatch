import { Layout } from "@/components/Layout";
import { useEffect } from "react";
import { BusinessRegistration } from "./components/BusinessRegistration";
import { ExpertRegistration } from "./components/ExpertRegistration";
import { UserChoice } from "./components/UserChoice";
import { useRegisterPageState } from "./register-page.state";

export const RegisterPage = () => {
  const { userType, setUserType } = useRegisterPageState();

  // Reset user type when route changes
  useEffect(() => {
    return () => {
      setUserType(undefined);
    };
  }, []);

  return (
    <Layout>
      <div className="mt-8 flex w-full items-center justify-center px-4">
        {!userType && <UserChoice />}
        {userType === "business" && <BusinessRegistration />}
        {userType === "expert" && <ExpertRegistration />}
      </div>
    </Layout>
  );
};
