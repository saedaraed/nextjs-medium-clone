interface CategoryTabsProps {
    categories: string[];
    activeTab: string;
    onChange: (tab: string) => void;
  }
  const CategoryTabs:React.FC<CategoryTabsProps> = ({ categories, activeTab, onChange  }) => (
    <div className="mb-8 overflow-x-auto">
      <div className="flex space-x-2 min-w-max">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onChange(category)}
            className={`px-4 py-2 rounded-full cursor-pointer transition-colors whitespace-nowrap !rounded-button ${
              activeTab === category
                ? "bg-[#3b0014] text-white"
                : "bg-white hover:text-white hover:bg-[#3b0014]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
  
  export default CategoryTabs;