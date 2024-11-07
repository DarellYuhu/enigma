import Board from "./components/Board";

const TwitterProjectDetail = ({
  params,
}: {
  params: { projectId: string };
}) => {
  return (
    <div>
      <Board projectId={params.projectId} />
    </div>
  );
};

export default TwitterProjectDetail;
