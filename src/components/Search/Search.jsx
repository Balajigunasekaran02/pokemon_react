import useDebounce from "../../hooks/useDebounce";
import "./Search.css";
function Search({ updateSearchTerm }) {
  const debounceUpdateSearch = useDebounce((e) =>
    updateSearchTerm(e.target.value)
  );
  return (
    <input
      id="search-pokemon"
      type="text"
      placeholder="Search Pokemon name..."
      onChange={debounceUpdateSearch}
    />
  );
}
export default Search;
