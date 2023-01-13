interface CurateTabProps {
  setActiveTab: (tab: 'submissions' | 'tags' | 'movies') => void;
  activeTab: 'submissions' | 'tags' | 'movies';
  tab: 'submissions' | 'tags' | 'movies';
  title: string;
}

const CurateTab = (props: CurateTabProps) => {
  const { setActiveTab, activeTab, title, tab } = props;

  return (
    <div
      onClick={() => setActiveTab(tab)}
      className={`flex cursor-pointer items-center justify-center rounded-full px-6 py-2 text-sm font-medium tracking-wide transition-all ${
        activeTab === tab ? 'bg-white text-black' : ''
      }`}
    >
      {title}
    </div>
  );
};

export default CurateTab;
