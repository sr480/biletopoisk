import { FunctionComponent, useEffect, useState } from "react";

interface Props {
  placeholder?: string;
  debounce?: number;
  onChange: (value: string) => void;
  initial?: string;
}
export const DebouncedInput: FunctionComponent<Props> = ({ placeholder, debounce = 500, onChange, initial = '' }) => {
  const [value, setValue] = useState(initial);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timer);
  }, [value, debounce, onChange]);

  return <input placeholder={placeholder} type="text" value={value} onChange={(e) => setValue(e.target.value)} />
}
