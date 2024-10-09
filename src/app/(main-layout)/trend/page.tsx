"use client";

import styles from "./trend.module.css";
import VisNetworkGraph from "@/componenets/VisNetworkGraph";
import Chip from "@/componenets/Chip";
import Card from "@/componenets/Card";
import CustomBarChart from "@/componenets/CustomBarChart";
import CustomPieChart from "@/componenets/CustomPieChart";
import Select from "@/componenets/Select";
import CustomLineChart from "@/componenets/CustomLineChart";
import VerticalBarChart from "@/componenets/VerticalBarChart";
import { useQuery } from "@tanstack/react-query";
import getTrends from "@/api/getTrends";
import Dashboard from "@/layouts/dashboard";
import getGraphs from "@/api/getGraphs";

const Trend = () => {
  // const trends = useQuery({
  //   queryKey: ["trends", "statistics"],
  //   queryFn: () =>
  //     getTrends({
  //       project: "0",
  //       since: "2024-07-8",
  //       until: "2024-10-8",
  //       string: "",
  //     }),
  // });
  // const graphs = useQuery({
  //   queryKey: ["trends", "graphs"],
  //   queryFn: () =>
  //     getGraphs({
  //       type: "tagRelation",
  //       project: "0",
  //       since: "2024-10-1",
  //       until: "2024-10-8",
  //       string: "",
  //     }),
  // });
  // if (graphs.status === "pending") {
  //   return <div>Loading...</div>;
  // }
  // if (!graphs.data) {
  //   return <div>No data</div>;
  // }
  return (
    <>
      <Dashboard>
        <div className="bg-green-400 border-[1px] border-black">
          trending topics
        </div>
      </Dashboard>
      {/* <div className={styles.Container}>
        <Card title="STATISTIK WAKTU KE WAKTU">
          <div className={styles.SelectionGroup}>
            <Select
              list={["play", "like", "share", "comment"]}
              onValueChange={(value) => console.log(value)}
            />
            <Select
              list={["play", "like", "share", "comment"]}
              onValueChange={(value) => console.log(value)}
            />
            <Select
              list={["play", "like", "share", "comment"]}
              onValueChange={(value) => console.log(value)}
            />
          </div>

          <CustomBarChart
            data={trends.data?.daily}
            labelKey="play"
            dataKey="date"
          />
          <CustomLineChart data={statisticData} labelKey="name" dataKey="uv" />
        </Card>

        <div className={styles.SecondBox}>
          <Card title="WEEKLY" padding={false}>
            <CustomLineChart
              data={trends.data?.weekly}
              labelKey="date"
              dataKey="play"
              height={100}
            />
          </Card>
          <Card title="MONTHLY" padding={false}>
            <CustomLineChart
              data={trends.data?.monthly}
              labelKey="date"
              dataKey="play"
              height={100}
            />
          </Card>
        </div>

        <Card title="TOP KREATOR">
          <div className={styles.SelectionGroup}>
            <Select
              list={["play", "like", "share", "comment"]}
              onValueChange={(value) => console.log(value)}
            />
          </div>
          <CustomPieChart data={pieData} dataKey="value" labelKey="name" />
        </Card>

        <Card title="INTEREST NETWORK">
          <VisNetworkGraph />
        </Card>

        <Card title="PETA HASHTAG">
          <VisNetworkGraph />
        </Card>

        <Card title="RINCIAN HASHTAG MENURUT SEGMENT AUDIENS">
          <div className={styles.FifthGrid}>
            <VerticalBarChart
              data={verticalBarData}
              dataKey="value"
              labelKey="name"
            />
            <VerticalBarChart
              data={verticalBarData}
              dataKey="value"
              labelKey="name"
            />
            <VerticalBarChart
              data={verticalBarData}
              dataKey="value"
              labelKey="name"
            />
          </div>
        </Card>

        <Card title="INFORMASI HASHTAG">
          <h4>#chelsea</h4>
          <div className={styles.TagInfo}>
            <Chip text="STATISTIK 2024-09-01 SD 2024-10-01" />
            <Chip text="STATISTIK 2024-09-01 SD 2024-10-01" />
            <Chip text="STATISTIK 2024-09-01 SD 2024-10-01" />
          </div>

          <h5>TOPIK TERKAIT</h5>

          <div className={styles.Topik}>
            <Chip text="Romance" />
            <Chip text="Other Transformation" />
            <Chip text="Family" />
          </div>
          <h4>Kategori Usia</h4>
          <VerticalBarChart
            data={verticalBarData}
            labelKey="name"
            dataKey="value"
            height={180}
          />
        </Card>
      </div> */}
    </>
  );
};

const pieData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const statisticData = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
  },
];

const verticalBarData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
];

export default Trend;
