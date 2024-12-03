import Datatable from "@/components/datatable/Datatable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ColumnDef } from "@tanstack/react-table";

const WorkspacePage = () => {
  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            <Datatable
              columns={columns}
              data={[{ id: "1", name: "John Doe", addedDate: "2023-01-01" }]}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

const columns: ColumnDef<{ id: string; name: string; addedDate: string }>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "addedDate",
    header: "Added Date",
  },
];

export default WorkspacePage;
