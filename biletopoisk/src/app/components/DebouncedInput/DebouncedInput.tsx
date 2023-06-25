import { useDebounce } from "@/app/hooks/useDebounce";
import { FunctionComponent, useEffect, useState } from "react";

interface Props {
  placeholder?: string;
  debounce?: number;
  onChange: (value: string) => void;
  initial?: string;
}
export const DebouncedInput: FunctionComponent<Props> = ({ placeholder, debounce = 500, onChange, initial = '' }) => {
  const [value, setValue] = useState(initial);
  const debouncedValue = useDebounce(value, debounce);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  return <input placeholder={placeholder} type="text" value={value} onChange={(e) => setValue(e.target.value)} />
}
