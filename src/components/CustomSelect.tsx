import { Select } from "antd";
import type { FC } from "react";

const CustomSelect: FC<{
  options: { label: string; value: string }[];
  extraClass?: string;
  placeholder: string;
}> = ({ options, extraClass, placeholder }) => {
  return (
    <Select
      className={`${extraClass}`}
      showSearch
      allowClear
      size="large"
      style={{ width: "100%" }}
      placeholder={placeholder}
      optionFilterProp="label"
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? "")
          .toLowerCase()
          .localeCompare((optionB?.label ?? "").toLowerCase())
      }
      options={options}
    />
  );
};

export default CustomSelect;
