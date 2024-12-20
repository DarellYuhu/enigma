import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";
import { format } from "date-fns";
import { Calendar } from "./calendar";

const DateRangePicker = ({
  max,
  className,
  date,
  setDate,
  numberOfMonths = 1,
}: {
  numberOfMonths?: number;
  max?: number;
  className?: string;
  date?: DateRange | undefined;
  setDate?: SelectRangeEventHandler;
}) => {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              " justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            toDate={new Date(Date.now() + 1000 * 60 * 60 * 24 * 1)}
            max={max}
            numberOfMonths={numberOfMonths}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangePicker;
