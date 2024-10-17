type Data = {
  projects: YoutubeProject[];
};

const getProjects = async () => {
  const response = await fetch("/api/v1/youtube/projects");
  const data: Data = await response.json();
  return data;
};

export default getProjects;
