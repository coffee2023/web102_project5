import React, { useEffect, useState } from "react";
import BookList from "./BookList";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import SummaryStats from "./SummaryStatus";

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("All");

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch("https://openlibrary.org/search.json?q=fantasy&limit=50");
      const json = await res.json();
      console.log("Fetched books:", json.docs);
      setBooks(json.docs);
    };
    fetchBooks();
  }, []);

  const filtered = books
    .filter((b) =>
        b.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((b) => {
        const year = b.first_publish_year;
        if (!year) return false;

        if (yearFilter === "All") return true;
        if (yearFilter === "Before 1900") return year < 1900;
        if (yearFilter === "1900-1924") return year >= 1900 && year <= 1924;
        if (yearFilter === "1925-1949") return year >= 1925 && year <= 1949;
        if (yearFilter === "1950-2000") return year >= 1950 && year <= 2000;

    return true;
  });



  const yearRanges = [
    "All",
    "Before 1900",
    "1900-1924",
    "1925-1949",
    "1950-2000",
  ];

  console.log("Current year filter:", yearFilter);
  console.log("Filtered books:", filtered);


  return (
    <>
      <div className="controls">
        <SearchBar value={search} onChange={setSearch} />
        <Filter
            value={yearFilter}
            onChange={setYearFilter}
            options={yearRanges}
        />

      </div>
      <SummaryStats data={filtered} />
      <BookList books={filtered.slice(0, 51)} />
    </>
  );
}
