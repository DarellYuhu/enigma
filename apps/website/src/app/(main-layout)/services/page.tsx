import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Form from "./components/Form";

const Services = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Manage your services</CardTitle>
          <CardDescription>
            Contact your vendor for more information
          </CardDescription>
        </CardHeader>
        <Form />
      </Card>
    </div>
  );
};

export default Services;
