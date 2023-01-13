import useTags from '../../hooks/useTags';
import TagItem from '../inputs/TagItem';
import { useState } from 'react';

const CurateTags = () => {
  const { tags, addTag } = useTags();

  const [newTag, setNewTag] = useState<string>('');
  const [newTagTitle, setNewTagTitle] = useState<string>('');

  const onAddNewTag = () => {
    if (newTag && newTagTitle) {
      addTag(newTag, newTagTitle);
      setNewTag('');
      setNewTagTitle('');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        {tags.map((tag) => (
          <TagItem key={tag.tag} tag={tag} />
        ))}
      </div>
      <div className="flex w-full flex-col gap-2 rounded-md md:w-min md:flex-row">
        <input
          type="text"
          placeholder="tag"
          value={newTag}
          onChange={(e) => {
            setNewTag(e.target.value);
          }}
          className="rounded border-none bg-zinc-900 px-4 py-2 text-sm outline-none"
        />
        <input
          type="text"
          placeholder="Tag Title"
          value={newTagTitle}
          onChange={(e) => {
            setNewTagTitle(e.target.value);
          }}
          className="rounded border-none bg-zinc-900 px-4 py-2 text-sm outline-none"
        />
        <button
          onClick={onAddNewTag}
          disabled={!newTag || !newTagTitle}
          className="rounded bg-white py-1 px-6 text-sm font-semibold text-black transition-all hover:bg-opacity-90 disabled:opacity-50 md:py-0"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default CurateTags;
