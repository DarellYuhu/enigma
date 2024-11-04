import GoogleSankey from "@/components/GoogleSankey";
import RechartSankey from "@/components/RechartSankey";

const TestPage = () => {
  return (
    <div>
      <div>
        <RechartSankey />
      </div>
      <div>
        <GoogleSankey />
      </div>
    </div>
  );
};

export default TestPage;
