const getProjectConfig = async (projectId: string) => {
  const response = await fetch(`/api/v1/youtube/projects/${projectId}/config`);
  const data: YoutubeProjectConfig = await response.json();
  return data;
};

export default getProjectConfig;
