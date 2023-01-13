import { useState } from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { FiEye, FiEyeOff, FiTrash } from 'react-icons/fi';
import useTags, { Tag } from '../../hooks/useTags';
import Spinner from '../Spinner';

interface TagItemProps {
  tag: Tag;
}

const TagItem = (props: TagItemProps) => {
  const { tag } = props;

  const [title, setTitle] = useState<string>(tag.title);

  const {
    toggleTagOrder,
    togglingTag,
    updateTagTitle,
    moveTag,
    movingTag,
    removeTag,
  } = useTags();

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
      className={`flex w-full flex-col items-center gap-4 rounded-md bg-zinc-900 py-3 px-2 md:w-min md:flex-row md:px-6`}
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
        <button
          className="flex aspect-square h-[22px] items-center justify-center rounded-full bg-white bg-opacity-0 p-1 transition-all hover:bg-opacity-10"
          onClick={onRemoveTag}
        >
          <FiTrash />
        </button>
        <span className="block w-[150px] text-end text-sm italic opacity-75 md:hidden">
          {tag.tag}
        </span>
        <div className="flex flex-row gap-1 md:hidden">
          <button
            className="flex aspect-square h-[22px] items-center justify-center rounded-full bg-white bg-opacity-0 p-1 transition-all hover:bg-opacity-10"
            disabled={movingTag}
            onClick={() => moveTag(tag, -1)}
          >
            <FaCaretUp size={16} />
          </button>
          <button
            className="flex aspect-square h-[22px] items-center justify-center rounded-full bg-white bg-opacity-0 p-1 transition-all hover:bg-opacity-10"
            disabled={movingTag}
            onClick={() => moveTag(tag, 1)}
          >
            <FaCaretDown size={16} />
          </button>
        </div>
      </div>
      <input
        className={`w-full rounded border-none bg-zinc-800 px-2 py-1 text-sm font-semibold outline-none md:w-[200px] md:bg-transparent md:px-0 md:py-0 ${
          tag.order === null ? 'line-through' : ''
        }`}
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
        onBlur={onUpdateTitle}
      />
      <span className="hidden w-[150px] text-end text-sm italic opacity-75 md:block">
        {tag.tag}
      </span>
      <div
        className={`hidden flex-row justify-end gap-1 md:flex md:justify-start ${
          tag.order === null ? 'pointer-events-none opacity-0' : ''
        }`}
      >
        <button
          className="flex aspect-square h-[22px] items-center justify-center rounded-full bg-white bg-opacity-0 p-1 transition-all hover:bg-opacity-10"
          disabled={movingTag}
          onClick={() => moveTag(tag, -1)}
        >
          <FaCaretUp size={16} />
        </button>
        <button
          className="flex aspect-square h-[22px] items-center justify-center rounded-full bg-white bg-opacity-0 p-1 transition-all hover:bg-opacity-10"
          disabled={movingTag}
          onClick={() => moveTag(tag, 1)}
        >
          <FaCaretDown size={16} />
        </button>
        <span className="w-[25px] text-end text-sm font-bold">
          {tag.order !== null ? tag.order : '-'}
        </span>
      </div>
    </div>
  );
};

export default TagItem;
