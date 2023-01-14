import { useState } from 'react';
import SortableList, { SortableItem, SortableKnob } from 'react-easy-sort';
import { FaGripVertical } from 'react-icons/fa';
import useTags from '../../hooks/useTags';
import TagItem from '../inputs/TagItem';

const CurateTags = () => {
  const { tags, addTag, moveTags, movingTag } = useTags();

  const [newTag, setNewTag] = useState<string>('');
  const [newTagTitle, setNewTagTitle] = useState<string>('');

  const onAddNewTag = () => {
    if (newTag && newTagTitle) {
      addTag(newTag, newTagTitle);
      setNewTag('');
      setNewTagTitle('');
    }
  };

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    const newTags = [...tags];
    const [removed] = newTags.splice(oldIndex, 1);
    newTags.splice(newIndex, 0, removed);
    for (let i = 0; i < newTags.length; i++) {
      if (newTags[i].order === null) continue;
      newTags[i].order = i;
    }
    moveTags(newTags);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="w-full md:max-w-[600px]">
        <SortableList
          onSortEnd={onSortEnd}
          className={movingTag ? 'opacity-50' : ''}
          lockAxis="y"
        >
          {tags.map((tag) => {
            if (tag.order === null) return;
            return (
              <SortableItem key={tag.tag}>
                <div className="mt-4 flex h-10 w-full items-center gap-2 first:mt-0">
                  <SortableKnob>
                    <div>
                      <FaGripVertical size={14} className={`cursor-grab`} />
                    </div>
                  </SortableKnob>
                  <TagItem tag={tag} />
                </div>
              </SortableItem>
            );
          })}
          {tags.map((tag) => {
            if (tag.order !== null) return;
            return (
              <div
                className="mt-4 flex h-10 w-full items-center gap-2 first:mt-0"
                key={tag.tag}
              >
                <SortableKnob>
                  <FaGripVertical
                    size={14}
                    className={`pointer-events-none cursor-grab opacity-0`}
                  />
                </SortableKnob>
                <TagItem tag={tag} />
              </div>
            );
          })}
        </SortableList>
        <div className="mt-8 flex w-full flex-col gap-2 rounded-md md:flex-row">
          <input
            type="text"
            placeholder="tag"
            value={newTag}
            onChange={(e) => {
              setNewTag(e.target.value);
            }}
            className="flex-1 rounded border-none bg-zinc-900 px-4 py-2 text-sm outline-none"
          />
          <input
            type="text"
            placeholder="Tag Title"
            value={newTagTitle}
            onChange={(e) => {
              setNewTagTitle(e.target.value);
            }}
            className="flex-1 rounded border-none bg-zinc-900 px-4 py-2 text-sm outline-none"
          />
          <button
            onClick={onAddNewTag}
            disabled={!newTag || !newTagTitle}
            className="rounded bg-white py-1 px-8 text-sm font-semibold text-black transition-all hover:bg-opacity-90 disabled:opacity-50 md:py-0"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurateTags;
