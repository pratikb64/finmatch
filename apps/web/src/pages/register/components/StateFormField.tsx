import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { statesCities } from "@/lib/states-cities";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

interface Props {
  onChange: (...event: any[]) => void;
  value: string;
  disabled?: boolean;
}

export const StateFormField = (props: Props) => {
  const [open, setOpen] = useState(false);

  const states = useMemo(() => {
    return Object.keys(statesCities).map((state) => ({
      value: state,
      label: state,
    }));
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={props.disabled}
        >
          {props.value
            ? states.find((state) => state.value === props.value)?.label
            : "Select state..."}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="!w-full p-0">
        <Command>
          <CommandInput placeholder="Search state..." />
          <CommandList>
            <CommandEmpty>No State found.</CommandEmpty>
            <CommandGroup>
              {states.map((state) => (
                <CommandItem
                  key={state.value}
                  value={state.value}
                  onSelect={(currentValue) => {
                    props.onChange(
                      currentValue === props.value ? undefined : currentValue,
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      props.value === state.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {state.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
