const SearchFilter = ({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
}) => {
  return (
    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Search for projects..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All cases</option>
        <option value="planned">planned</option>
        <option value="in-progress">in-progress</option>
        <option value="completed">completed</option>
      </select>
    </div>
  );
};

export default SearchFilter;
