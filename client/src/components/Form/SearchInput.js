import React, { useState } from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiSearch, BiX } from "react-icons/bi";
// import { IoClose } from "react-icons/io5";
const SearchInput = () => {
  const [values, setValues] = useSearch();
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* <div>
        {isActive ? (
          <>
            <form
              className="d-flex search-form"
              role="search"
              onSubmit={handleSubmit}
            >
              <input
                className="form-control me-1 border-0 mt-1"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={values.keyword}
                onChange={(e) =>
                  setValues({ ...values, keyword: e.target.value })
                }
              />
            </form>
          </>
        ) : (
          <>
            <BiSearch
              style={{
                fontSize: `${22}px`,
                marginTop: `${11}px`,
                marginRight: `${10}px`,
                marginLeft: `${10}px`,
              }}
              onClick={() => setIsActive(true)}
              type="submit"
            />
          </>
        )}
      </div> */}
      <form className="search-form" role="search" onSubmit={handleSubmit}>
        <div
          className="d-flex justify-content-center align-items-start flex-row"
          style={{ marginTop: "7px" }}
        >
          {isActive ? (
            <>
              <input
                className="form-control border-0 rounded-pill"
                style={{
                  width: "400px",
                  backgroundColor: "#e8eafc",
                }}
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={values.keyword}
                onChange={(e) =>
                  setValues({ ...values, keyword: e.target.value })
                }
              />
              {/* Render close button when search bar is open */}
              <BiX
                style={{
                  fontSize: `${30}px`,

                  marginRight: `${13}px`,
                  color: "#0d6efd",
                  cursor: "pointer",
                }}
                onClick={() => setIsActive(false)}
                type="button"
              />
            </>
          ) : (
            <>
              {/* Render search icon when search bar is closed */}
              <BiSearch
                style={{
                  fontSize: `${26}px`,
                  marginTop: "4px",
                  marginRight: `${15}px`,
                  color: "#2d373c",
                  cursor: "pointer",
                  textDecoration: "none",
                  // Hover state
                  ":hover": {
                    transform: "scale(1.2)",
                    transition: "transform 0.3s ease",
                  },
                }}
                onClick={() => setIsActive(true)}
                type="button"
              />
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default SearchInput;
