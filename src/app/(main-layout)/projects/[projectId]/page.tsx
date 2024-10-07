"use client";

import { useEffect } from "react";

const ProjectDetail = () => {
  const getVisualizationData = async () => {
    try {
      const response = await fetch("/api/v1/project/statistics", {
        method: "POST",
        body: JSON.stringify({
          project: "0",
          since: "2024-07-8",
          until: "2024-10-8",
          string: "l",
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVisualizationData();
  }, []);
  return <div>ProjectDetail</div>;
};

export default ProjectDetail;
