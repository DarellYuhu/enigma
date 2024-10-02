"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  LabelList,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styles from "./trend.module.css";
import { useQuery } from "@tanstack/react-query";
import VisNetworkGraph from "@/componenets/VisNetworkGraph";
import Chip from "@/componenets/Chip";
import Card from "@/componenets/Card";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Trend = () => {
  return (
    <div className={styles.container}>
      <Card title="STATISTIK WAKTU KE WAKTU">
        <ResponsiveContainer width={"100%"} height={300}>
          <BarChart data={statisticData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="pv" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer> */}

      <Card title="TOP KREATOR">
        <ResponsiveContainer width={"100%"} height={300}>
          <PieChart>
            <Pie
              data={pieData}
              innerRadius={50}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {statisticData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend layout="vertical" align="right" verticalAlign="middle" />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      <Card title="INTEREST NETWORK">
        <VisNetworkGraph />
      </Card>

      <Card title="PETA HASHTAG">
        <VisNetworkGraph />
      </Card>

      <Card title="RINCIAN HASHTAG MENURUT SEGMENT AUDIENS">
        <div className={styles.fifthGrid}>
          <ResponsiveContainer width={"100%"} height={300}>
            <BarChart data={verticalBarData} layout="vertical">
              <XAxis type="number" />
              <YAxis type="category" hide dataKey="name" />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Legend />
              <Bar dataKey="value" fill="#8884d8">
                <LabelList
                  dataKey="name"
                  position="insideLeft"
                  style={{ fill: "#fff", fontSize: "14px" }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <ResponsiveContainer width={"100%"} height={300}>
            <BarChart data={verticalBarData} layout="vertical">
              <XAxis type="number" />
              <YAxis type="category" hide dataKey="name" />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Legend />
              <Bar dataKey="value" fill="#8884d8">
                <LabelList
                  dataKey="name"
                  position="insideLeft"
                  style={{ fill: "#fff", fontSize: "14px" }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <ResponsiveContainer width={"100%"} height={300}>
            <BarChart data={verticalBarData} layout="vertical">
              <XAxis type="number" />
              <YAxis type="category" hide dataKey="name" />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Legend />
              <Bar dataKey="value" fill="#8884d8">
                <LabelList
                  dataKey="name"
                  position="insideLeft"
                  style={{ fill: "#fff", fontSize: "14px" }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card title="INFORMASI HASHTAG">
        <h4>#chelsea</h4>
        <div className={styles.tagInfo}>
          <Chip text="STATISTIK 2024-09-01 SD 2024-10-01" />
          <Chip text="STATISTIK 2024-09-01 SD 2024-10-01" />
          <Chip text="STATISTIK 2024-09-01 SD 2024-10-01" />
        </div>

        <h5>TOPIK TERKAIT</h5>

        <div className={styles.topik}>
          <Chip text="Romance" />
          <Chip text="Other Transformation" />
          <Chip text="Family" />
        </div>
        <h4>Kategori Usia</h4>
        <ResponsiveContainer width={"100%"} height={180}>
          <BarChart data={verticalBarData} layout="vertical">
            <XAxis type="number" />
            <YAxis type="category" hide dataKey="name" />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Legend />
            <Bar dataKey="value" fill="#8884d8">
              <LabelList
                dataKey="name"
                position="insideLeft"
                style={{ fill: "#fff", fontSize: "14px" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
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
