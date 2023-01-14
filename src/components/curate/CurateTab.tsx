interface CurateTabProps {
  setActiveTab: (tab: 'submissions' | 'tags' | 'featured' | 'edit') => void;
  activeTab: 'submissions' | 'tags' | 'featured' | 'edit';
  tab: 'submissions' | 'tags' | 'featured' | 'edit';
  title: string;
}

const CurateTab = (props: CurateTabProps) => {
  const { setActiveTab, activeTab, title, tab } = props;

  return (
    <div
      onClick={() => setActiveTab(tab)}
      className={`flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full px-6 py-2 text-sm font-medium tracking-wide transition-all ${
        activeTab === tab ? 'bg-white text-black' : ' bg-transparent text-white'
      }`}
    >
      {title}
    </div>
  );
};

export default CurateTab;
