import { FiX } from 'react-icons/fi';
import { useState } from 'react';

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  className?: string;
  tagClassName?: string;
  id: string;
  options: string[];
  validateTag?: (tag: string) => boolean;
}

const TagInput = (props: TagInputProps) => {
  const { tags, setTags, className, id, options, tagClassName, validateTag } =
    props;

  const [value, setValue] = useState<string>('');

  const removeTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const addTag = (tag: string) => {
    if (tag.length > 0 && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  return (
    <div className={`rounded bg-zinc-900 p-2 ${className}`}>
      <div className="flex flex-wrap gap-1">
        {tags.map((tag, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 rounded bg-zinc-800 px-2 py-1 text-gray-200 ${tagClassName} ${
              validateTag !== undefined && !validateTag(tag) && 'text-red-500'
            }`}
          >
            <span className="text-sm font-normal tracking-wide">{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-700 bg-opacity-0 transition-all hover:bg-opacity-80"
            >
              <FiX size={12} />
            </button>
          </div>
        ))}
        <input
          autoComplete="off"
          type="text"
          id={id}
          className="min-w-[100px] max-w-[150px] flex-1 border-none bg-transparent px-2 py-1 text-sm outline-none"
          placeholder="Add a tag"
          list={`suggestions-${id}`}
          value={value}
          onChange={(e) => {
            if (
              options.includes(e.currentTarget.value) &&
              e.currentTarget.value.length - value.length > 1
            ) {
              addTag(e.currentTarget.value);
              setValue('');
            } else {
              setValue(e.currentTarget.value);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addTag(e.currentTarget.value);
              setValue('');
            }
          }}
        />
        <datalist id={`suggestions-${id}`}>
          {options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </datalist>
      </div>
    </div>
  );
};

export default TagInput;
