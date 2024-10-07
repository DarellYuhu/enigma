import * as Select from "@radix-ui/react-select";
import styles from "./select.module.css";
import { ChevronDown } from "lucide-react";

type Props = {
  list: string[];
  onValueChange: (value: string) => void;
};

export default ({ list, onValueChange }: Props) => (
  <Select.Root defaultValue={list[0]}>
    <Select.Trigger className={styles.Trigger}>
      <Select.Value placeholder="Select an option" />
      <Select.Icon className={styles.Icon}>
        <ChevronDown width={20} height={20} />
      </Select.Icon>
    </Select.Trigger>

    <Select.Portal>
      <Select.Content position="popper" className={styles.Content}>
        <Select.ScrollUpButton className={styles.ScrollButton} />
        <Select.Viewport className={styles.Viewport}>
          {list.map((item, index) => (
            <Select.Item className={styles.Item} value={item} key={index}>
              <Select.ItemText>{item}</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Viewport>
        <Select.ScrollDownButton />
        <Select.Arrow />
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);
