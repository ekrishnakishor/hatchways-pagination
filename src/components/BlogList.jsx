import { useState } from "react";
import blogs from "../data/blogs.json";
import { usePaginationNew } from "../hooks/usePagination";
import BlogPost from "./BlogPost";
import Pagination from "./Pagination";

const PAGE_SIZES = [15, 25, 50, 100];

function BlogList() {
  const [pageSize, setPageSize] = useState(25);

  const handlePageSize = (e) => {
    console.log(e);
    setPageSize(e);
  };

  const {
    currentData,
    maxPage,
    currentPage,
    jump,
    next,
    prev,
    paginationRange,
  } = usePaginationNew(blogs.posts, pageSize);

  const currentBlogPosts = currentData();

  return (
    <div>
      <Pagination
        next={next}
        prev={prev}
        jump={jump}
        pageSize={pageSize}
        totalCount={maxPage}
        currentPage={currentPage}
        pageSizeOptions={PAGE_SIZES}
        onPageChange={handlePageSize}
        paginationRange={paginationRange}
      />
      <ul
        // Do not remove the aria-label below, it is used for Hatchways automation.
        aria-label="blog list"
      >
        {currentBlogPosts.map((blog) => (
          <BlogPost
            key={blog.id}
            author={blog.author}
            title={blog.title}
            excerpt={blog.excerpt}
            featureImage={blog.image}
          />
        ))}
      </ul>
    </div>
  );
}

export default BlogList;
