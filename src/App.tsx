import { useState } from "react";
import { useFetchPosts } from "./useFetchPosts";

export default function App() {
  const [inputUrl, setInputUrl] = useState("");
  const [submittedUrl, setSubmittedUrl] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, refetch, loading, error } = useFetchPosts(submittedUrl);

  console.log(data);

  const handleFetch = () => {
    if (inputUrl.trim()) {
      setSubmittedUrl(inputUrl);
      setCurrentPage(1);
    }
  };

  const itemsPerPage = 10;
  const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;
  const start = (currentPage - 1) * itemsPerPage;
  const currentPosts = data ? data.slice(start, start + itemsPerPage) : [];

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <section className="flex flex-col items-start justify-center min-screen mx-auto mt-15 max-w-4xl">
      <h1 className="font-bold text-5xl text-gray-900">Post Fetcher</h1>
      <p className="text-gray-400 text-xl">
        Enter a URL to fetch and display posts
      </p>
      <div className="mt-10 border px-5 py-5 rounded-lg w-full border-gray-300 shadow-sm mb-6">
        <h1 className="font-bold text-gray-900 text-xl">Fetch Posts</h1>
        <p className="text-gray-400">
          Enter the API endpoint URL to fetch posts from
        </p>

        <form className="flex gap-2 mt-4" onSubmit={(e) => e.preventDefault()}>
          <input
            className="border rounded border-gray-300 p-1 w-xl"
            type="text"
            name="search"
            id="search"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="https://jsonplaceholder.typicode.com/posts"
          />
          <button
            onClick={handleFetch}
            className="rounded px-2 py-0.5 bg-gray-900 text-white cursor-pointer  "
          >
            {loading ? "Fetching..." : "fetch"}
          </button>
          <button
            onClick={refetch}
            className="flex items-center gap-2 border rounded px-2 py-0.5 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path
                fill-rule="evenodd"
                d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z"
                clip-rule="evenodd"
              />
            </svg>
            Retry
          </button>
        </form>
      </div>

      {/* DISPLAY POST SECTIONS */}

      {error && !loading && (
        <div>
          <p>
            Error <strong>{error}</strong>
          </p>
        </div>
      )}

      {!loading && !error && data && (
        <>
          <div>
            {currentPosts.map((post) => (
              <div key={post.id}>
                <h3>
                  {post.id}. {post.title}
                </h3>
                <p>{post.body}</p>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div>
              <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
