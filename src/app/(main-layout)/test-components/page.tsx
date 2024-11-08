import dynamic from "next/dynamic";
import RechartSankey from "@/components/RechartSankey";

const SankeyChartJs = dynamic(() => import("@/components/SankeyChartJs"), {
  ssr: false,
});

const TestPage = () => {
  return (
    <div>
      <div>
        <RechartSankey />
      </div>
      <div className="w-fulll h-60">{/* <SankeyChartJs /> */}</div>
    </div>
  );
};

export default TestPage;
