import { useState } from 'react';
import { FiEye, FiEyeOff, FiTrash } from 'react-icons/fi';
import useTags, { Tag } from '../../hooks/useTags';
import Spinner from '../Spinner';

interface TagItemProps {
  tag: Tag;
}

const TagItem = (props: TagItemProps) => {
  const { tag } = props;

  const [title, setTitle] = useState<string>(tag.title);

  const { toggleTagOrder, togglingTag, updateTagTitle, removeTag } = useTags();

  const onUpdateTitle = () => {
    if (title !== tag.title) {
      updateTagTitle(tag, title);
    }
  };

  const onRemoveTag = () => {
    if (window.confirm(`Are you sure you want to remove '${tag.tag}'?`)) {
      removeTag(tag.tag);
    }
  };

  return (
    <div
      className={`flex w-full flex-row items-center gap-4 rounded-md bg-zinc-900 px-2 py-3 md:px-4`}
    >
      <div className="flex w-min flex-row gap-2">
        <button
          className="flex aspect-square h-[22px] items-center justify-center rounded-full bg-white bg-opacity-0 p-1 transition-all hover:bg-opacity-10"
          disabled={togglingTag}
          onClick={() => toggleTagOrder(tag)}
        >
          {togglingTag ? (
            <Spinner />
          ) : tag.order !== null ? (
            <FiEye size={14} />
          ) : (
            <FiEyeOff size={14} />
          )}
        </button>
      </div>
      <input
        className={`w-full flex-1 rounded border-none bg-transparent px-2 py-1 text-sm font-semibold outline-none md:w-[200px] md:px-0 md:py-0 ${
          tag.order === null ? 'line-through' : ''
        }`}
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
        onBlur={onUpdateTitle}
      />
      <span className="text-end text-sm italic opacity-75 md:w-[150px]">
        {tag.tag}
      </span>
      <button
        className="flex aspect-square h-[22px] items-center justify-center rounded-full bg-white bg-opacity-0 p-1 transition-all hover:bg-opacity-10"
        onClick={onRemoveTag}
      >
        <FiTrash />
      </button>
    </div>
  );
};

export default TagItem;
