import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from '../components/Loader/Loader';
import BookCard from '../components/BookCard/BookCard';

const AllBook = () => {
  const [Data, setData] = useState(null); // Initialize Data as null
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v1/get-all-books");
        setData(response.data.data); // Update Data state with fetched books
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched or error occurs
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="bg-zinc-900 h-auto px-12 py-8">
      <h4 className="text-3xl text-yellow-100">All Books</h4>
      {loading && (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader /> 
        </div>
      )}
      <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {Data &&
          Data.map((items, i) => (
            <div key={i}>
              <BookCard data={items} /> 
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllBook;
