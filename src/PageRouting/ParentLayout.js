import React from "react";
import { Link, Outlet } from "react-router-dom";

const ParentLayout = () => {
  const dynamicPage = [
    {
      id: 1,
      pageTitle: "Page 1",
    },
    {
      id: 2,
      pageTitle: "Page 2",
    },
    {
      id: 3,
      pageTitle: "Page 3",
    },
  ];
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="line mb-4">
            {dynamicPage.map((item) => {
              return (
                <Link
                  className="btn btn-secondary mr-2"
                  key={item.id}
                  to={`/page-routing/${item.id}`}
                >
                  {item.pageTitle}
                </Link>
              );
            })}
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ParentLayout;
