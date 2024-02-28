import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const EditBook = () => {
  const [title, setTilte] = useState("");
  const [author, setAutohr] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(id);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((response) => {
        setTilte(response.data.book.title);
        setAutohr(response.data.book.author);
        setPublishYear(response.data.book.publishYear);
        // console.log(response.data.book.title);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:3000/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  // console.log(axios.isCancel("something"));

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Update Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label htmlFor="" className="text-xl mr-4 text-gray-500">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTilte(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-xl outline-none"
            placeholder="Enter title..."
          />
          <label htmlFor="" className="text-xl mr-4 text-gray-500">
            Author
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAutohr(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-xl outline-none"
            placeholder="Enter author's name..."
          />
          <label htmlFor="" className="text-xl mr-4 text-gray-500">
            Publish Year
          </label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-xl outline-none"
            placeholder="Enter publish year..."
          />
        </div>
        <button
          onClick={handleEditBook}
          className="w-full bg-sky-500 py-2 text-white text-xl rounded-xl"
        >
          Edit Book
        </button>
      </div>
    </div>
  );
};

export default EditBook;
