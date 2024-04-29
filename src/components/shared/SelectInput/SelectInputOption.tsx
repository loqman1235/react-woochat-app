interface SelectInputOptionProps {
  value: string;
}

const SelectInputOption = ({ value }: SelectInputOptionProps) => {
  return <option value={value}>{value}</option>;
};

export default SelectInputOption;
