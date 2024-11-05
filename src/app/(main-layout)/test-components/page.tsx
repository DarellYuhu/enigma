import GoogleSankey from "@/components/GoogleSankey";
import RechartSankey from "@/components/RechartSankey";
import normalizeForSankey from "@/utils/normalizeForSankey";
import sankeyData from "@/data/sankey.json";
import ReavizSankey from "@/components/ReavizSankey";

const TestPage = () => {
  return (
    <div>
      <div>
        <RechartSankey />
      </div>
      <div>
        <GoogleSankey data={normalizeForSankey(sankeyData)} />
      </div>
      <div>
        <ReavizSankey />
      </div>
    </div>
  );
};

export default TestPage;
