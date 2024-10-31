import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useResetPassword } from "@/hooks/useResetPassword";

const ResetPassAlert = ({ id }: { id: number }) => {
  const { mutate } = useResetPassword();
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Are you sure to reset this account password?
        </AlertDialogTitle>
        <AlertDialogDescription>
          {'The default password is "123456" without quotes. Please change it'}
          after reset.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={() => mutate(id.toString())}>
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default ResetPassAlert;
