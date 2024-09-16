import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateBook = () => {
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    languages: "",
  });

  const {id} = useParams;
  const navigate = useNavigate();

  
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid : id,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    try {
      if (
        Data.url === "" ||
        Data.title === "" ||
        Data.author === "" ||
        Data.price === "" ||
        Data.desc === "" ||
        Data.languages === ""
      ) {
        alert("Please fill all the fields");
      } else {
        const response = await axios.put(
          "http://localhost:3001/api/update-book",
          Data,
          { headers }
        );
        setData({
          url: "",
          title: "",
          author: "",
          price: "",
          desc: "",
          languages: "",
        });
        alert(response.data.msg);
        navigate(`/view-book-details/${id}`);
      }
    } catch (error) {
      alert(
        error.response.data.msg || "Error occurred while adding the book"
      );
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:1000/api/v1/get-book-by-id/${id}`
      );
      setData(response.data.data);
    };
    fetch();
  }, []);
  
  return (
    <div className="bg-zinc-900 h-[100%] p-0 md:p-4">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        Update Book
      </h1>
      <div className="p-4 bg-zinc-800 rounded">
        <div>
          <label htmlFor="url" className="text-zinc-400">
            Image
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-100 p-2 outline-none"
            placeholder="url of image"
            name="url"
            required
            value={Data.url}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="title" className="text-zinc-400">
            Title of Book
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-100 p-2 outline-none"
            placeholder="Title of Book"
            name="title"
            required
            value={Data.title}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="author" className="text-zinc-400">
            Author of Book
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-100 p-2 outline-none"
            placeholder="Author of Book"
            name="author"
            required
            value={Data.author}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="languages" className="text-zinc-400">
            Language
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-100 p-2 outline-none"
            placeholder="Language of Book"
            name="language" // Corrected name attribute
            required
            value={Data.language}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="price" className="text-zinc-400">
            Price
          </label>
          <input
            type="number"
            className="w-full mt-2 bg-zinc-100 p-2 outline-none"
            placeholder="Price of Book"
            name="price"
            required
            value={Data.price}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="desc" className="text-zinc-400">
            Description of Book
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-100 p-2 outline-none"
            placeholder="Description of Book"
            name="desc"
            required
            value={Data.desc}
            onChange={change}
          />
        </div>
        <button
          className="mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300"
          onClick={submit}
        >
          Update Book
        </button>
      </div>
    </div>
  );
}

export default UpdateBook;
