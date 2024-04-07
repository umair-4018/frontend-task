import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { ForbiddenIcon } from "../icons";

function Page404() {
  const token = useSelector((state) => state.login.user?.token);
  return (
    <div className="mt-16 flex flex-col items-center">
   
      <h1 className="text-6xl font-semibold text-gray-700 dark:text-gray-200">
        404
      </h1>
      <p className="text-gray-700 dark:text-gray-300">
        Page not found. Check the address or{" "}
        {token ?
          <Link
            className="text-blue-700 hover:underline dark:text-blue-300"
            to="/dashboard"
          >
            go back
          </Link> : <Link
            className="text-blue-700 hover:underline dark:text-blue-300"
            to="/login"
          >
            go back
          </Link>}

        .
      </p>
    </div>
  );
}

export default Page404;
