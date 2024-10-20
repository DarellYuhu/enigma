"use client";

import CustomBarChart from "@/components/custom-barchart";
import HorizontalBarChart from "@/components/custom-horizontalbarchart";
import VisGraph from "@/components/visgraph";
import interest from "@/data/interest";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import Image from "next/image";
import { useState } from "react";

const ProjectDetail = ({ params }: { params: { projectId: string } }) => {
  const [selected, setSelected] = useState("a");

  return (
    <>
      <div>{params.projectId}</div>
      <div className="grid grid-cols-12 gap-2 ">
        <div className="card col-span-full flex flex-row flex-nowrap gap-2 overflow-x-auto">
          {Array.from({ length: 15 }).map((_, index) => (
            <Image
              key={index}
              src={"/avatars/me.jpg"}
              alt="profile_picture"
              className="aspect-[16/9] rounded-lg object-contain bg-slate-200"
              width={300}
              height={300}
            />
          ))}
        </div>

        <div className="card col-span-3 space-y-3">
          <h3>Lorem ipsum dolor sit amet consectetur</h3>
          <Image
            className="aspect-[16/9] rounded-lg object-contain bg-slate-200"
            width={300}
            height={300}
            src={"/avatars/me.jpg"}
            alt="profile_picture"
          />
          <h4 className="text-sm font-light text-slate-500 dark:text-slate-400 text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h4>
        </div>
        <div className="col-span-2 space-y-3">
          <div className="card text-center space-y-2">
            <h3 className="text-3xl font-semibold">18K</h3>
            <p>Likes</p>
          </div>
          <div className="card text-center space-y-2">
            <h3 className="text-3xl font-semibold">18K</h3>
            <p>Views</p>
          </div>
          <div className="card text-center space-y-2">
            <h3 className="text-3xl font-semibold">18K</h3>
            <p>Comments</p>
          </div>
        </div>
        <div className="card col-span-7">
          <CustomBarChart data={dummyData} dataKey="date" labelKey="value" />
        </div>
        <div className="card col-span-4">
          <h2>Top Publication Channels</h2>
          <div className="h-[300px]">
            <HorizontalBarChart
              data={dummyData}
              dataKey="value"
              labelKey="date"
              color="#c4b5fd"
            />
          </div>
        </div>
        <div className="card col-span-8">
          <h2>ANC 24/7</h2>
          <CustomBarChart data={dummyData} dataKey="date" labelKey="value" />
        </div>
        <div className="card col-span-4">
          <h2>Top Video Sources</h2>
          <div className="space-y-2">
            <ToggleGroup
              type="single"
              value={selected}
              onValueChange={(value) => {
                if (value) setSelected(value);
              }}
              className="flex flex-col flex-nowrap items-center gap-2"
            >
              {["a", "b", "c"].map((value, index) => {
                console.log(value);
                return (
                  <ToggleGroupItem
                    key={index}
                    value={value}
                    className={` bg-slate-300 w-full p-1 text-sm rounded-md transition-all duration-300 ${
                      selected === value ? "bg-red-700 text-white" : ""
                    }`}
                  >
                    {value}
                  </ToggleGroupItem>
                );
              })}
            </ToggleGroup>
            <button className="bg-slate-300 py-1 px-4 text-xs flex justify-self-center rounded-md  transition-all duration-300 hover:bg-red-600 hover:text-white">
              VIEW
            </button>
            <div className="flex flex-row flex-nowrap gap-2 overflow-x-auto">
              {Array.from({ length: 15 }).map((_, index) => (
                <Image
                  key={index}
                  src={"/avatars/me.jpg"}
                  alt="profile_picture"
                  className="aspect-[16/9] rounded-lg object-contain bg-slate-200"
                  width={200}
                  height={200}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="card col-span-8">
          {/* <VisGraph data={interest.network} /> */}
        </div>
        {/* <div className="card col-span-4">1items</div>
        <div className="card col-span-8">items</div>
        <div className="card col-span-4">items</div>
        <div className="card col-span-8">items</div>
        <div className="card col-span-full">items</div> */}
      </div>
    </>
  );
};

const dummyData: { value: number; date: string }[] = [
  { value: 100, date: new Date("2022-01-01").toLocaleDateString() },
  { value: 200, date: new Date("2022-01-02").toLocaleDateString() },
  { value: 300, date: new Date("2022-01-03").toLocaleDateString() },
  { value: 400, date: new Date("2022-01-04").toLocaleDateString() },
  { value: 500, date: new Date("2022-01-05").toLocaleDateString() },
  { value: 600, date: new Date("2022-01-06").toLocaleDateString() },
  { value: 700, date: new Date("2022-01-07").toLocaleDateString() },
  { value: 800, date: new Date("2022-01-08").toLocaleDateString() },
  { value: 900, date: new Date("2022-01-09").toLocaleDateString() },
  { value: 1000, date: new Date("2022-01-10").toLocaleDateString() },
  { value: 1100, date: new Date("2022-01-11").toLocaleDateString() },
  { value: 1200, date: new Date("2022-01-12").toLocaleDateString() },
  { value: 1300, date: new Date("2022-01-13").toLocaleDateString() },
];

export default ProjectDetail;
