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
  stateName?: string;
}

export const CityFormField = (props: Props) => {
  const [open, setOpen] = useState(false);
  const { disabled, onChange, stateName } = props;

  const cities = useMemo(() => {
    if (disabled) {
      return [];
    }
    const selectedState = Object.keys(statesCities).find(
      (key) => key === stateName,
    );

    if (!selectedState) {
      return [];
    }

    onChange(undefined);

    return (
      statesCities[selectedState]?.map((city) => ({
        value: city,
        label: city,
      })) || []
    );
  }, [disabled, onChange, stateName]);

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
            ? cities.find((city) => city.value === props.value)?.label
            : "Select city..."}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search city..." />
          <CommandList>
            <CommandEmpty>No State found.</CommandEmpty>
            <CommandGroup>
              {cities.map((city) => (
                <CommandItem
                  key={city.value}
                  value={city.value}
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
                      props.value === city.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {city.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
