import GoogleSankey from "@/components/GoogleSankey";
import RechartSankey from "@/components/RechartSankey";
import normalizeForSankey from "@/utils/normalizeForSankey";
import sankeyData from "@/data/sankey.json";
import ReavizSankey from "@/components/ReavizSankey";
import SankeyChartJs from "@/components/SankeyChartJs";

const TestPage = () => {
  return (
    <div>
      <div>
        <RechartSankey />
      </div>
      <div>
        <GoogleSankey data={normalizeForSankey(sankeyData)} />
      </div>
      <div>{/* <ReavizSankey /> */}</div>
      <div className="w-fulll h-60">
        <SankeyChartJs />
      </div>
    </div>
  );
};

export default TestPage;
