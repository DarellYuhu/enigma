import { Separator } from "@/components/ui/separator";
import From from "./components/From";

const Account = ({ params }: { params: { userId: string } }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Change Password</h3>
        <p className="text-sm text-muted-foreground">
          You can change your password here
        </p>
      </div>
      <Separator />
      <From id={params.userId} />
    </div>
  );
};

export default Account;
