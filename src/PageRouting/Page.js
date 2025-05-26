import React from "react";
import { useParams } from "react-router-dom";

const Page = () => {
  const dynamicPage = [
    {
      id: 1,
      pageTitle: "Page 1",
      pageContent: "Page 1 Content",
    },
    {
      id: 2,
      pageTitle: "Page 2",
      pageContent: "Page 2 Content",
    },
    {
      id: 3,
      pageTitle: "Page 3",
      pageContent: "Page 3 Content",
    },
  ];
  const { id } = useParams();
  return (
    <div className="container">
      <div className="row">
        <div className="col ta-l">
          <h1 className="title">In page routing - Child page</h1>
          {/* <Link className="btn btn-secondary" to="/page-routing">
            Go Back
          </Link> */}
          {/* <br /> */}
          {dynamicPage[id - 1].pageContent}
        </div>
      </div>
    </div>
  );
};

export default Page;
