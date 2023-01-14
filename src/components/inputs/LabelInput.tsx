interface LabelInputProps {
  label: string;
  id: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  area?: boolean;
}

const LabelInput = (props: LabelInputProps) => {
  const { label, id, placeholder, value, setValue, area } = props;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-400">
        {label}
      </label>
      {!area ? (
        <input
          type="text"
          name={id}
          id={id}
          placeholder={placeholder}
          className="rounded border-none bg-zinc-900 p-2 px-3 text-sm font-normal outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <textarea
          name={id}
          id={id}
          placeholder={placeholder}
          className="min-h-[100px] rounded border-none bg-zinc-900 p-2 px-3 text-sm font-normal outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      )}
    </div>
  );
};

export default LabelInput;
