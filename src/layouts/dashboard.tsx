import React from "react";

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-4 gap-3">
      <div className="bg-green-400 border-[1px] border-black">play</div>
      <div className="bg-green-400 border-[1px] border-black">like</div>
      <div className="bg-green-400 border-[1px] border-black">share</div>
      <div className="bg-green-400 border-[1px] border-black">comment</div>
      <div className="grid grid-rows-2 gap-3">
        <div className="bg-green-400 border-[1px] border-black">weekly</div>
        <div className="bg-green-400 border-[1px] border-black">monthly</div>
      </div>
      <div className="bg-green-400 border-[1px] border-black col-span-3">
        daily
      </div>
      <div className="bg-green-400 border-[1px] border-black">top creator</div>
      <div className="bg-green-400 border-[1px] border-black col-span-3">
        hashtag by segment audiens
      </div>
      <div className="bg-green-400 border-[1px] border-black col-span-2">
        interest network
      </div>
      <div className="bg-green-400 border-[1px] border-black col-span-2">
        heshtag network
      </div>
      <div className="bg-green-400 border-[1px] border-black">hashtag info</div>
      <>{children}</>
    </div>
  );
};

export default Dashboard;
