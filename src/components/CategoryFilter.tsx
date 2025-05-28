import { useCategories } from '../hooks/useCategories';

interface Props {
  selected: string;
  onChange: (val: string) => void;
}

const CategoryFilter: React.FC<Props> = ({ selected, onChange }) => {
  const { data } = useCategories();

  return (
    <select value={selected} onChange={e => onChange(e.target.value)}>
      <option value="">All Categories</option>
      {data?.map((cat: string) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;
