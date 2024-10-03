import { Dialog } from "@headlessui/react";
import { useState } from "react";

const EditPanel = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <Dialog open={true} onClose={setOpen}>
      <div>test</div>
    </Dialog>
  );
};

export default EditPanel;
