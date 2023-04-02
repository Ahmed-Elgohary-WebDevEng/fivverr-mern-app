import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/GigCard/GigCard";
import { useQuery, useQueryClient } from "react-query";
import sendRequest from "../../utils/send-request.util";
import { useLocation } from "react-router-dom";
import GigsApi from "../../api/gigs/gigs-api";

function Gigs(props) {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");
  const minRef = useRef();
  const maxRef = useRef();
  const { search } = useLocation();

  /*
    const {
      status,
      data: gigs,
      error,
      refetch,
    } = useQuery("gigs", async () => {
      const response = await sendRequest.get(
        `/gigs?${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
      );
      return response.data;
    });
  */
  const {
    status,
    data: gigs,
    error,
    refetch,
  } = useQuery("gigs", () => {
    return GigsApi.getAllGigs({
      search,
      min: minRef.current.value,
      max: maxRef.current.value,
      sort,
    });
  });

  // console.log(gigs)
  function apply() {
    refetch();
  }

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort]);

  return (
    <div className={"gigs"}>
      <div className="container">
        <span className="breadcrumbs">Fiverr &gt; Graphic & Design</span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Liverr AI artists
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className={"sortBy"}>SortBy</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src={"/img/down.png"} alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
                <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {status === "loading"
            ? "Loading..."
            : gigs.map((gig) => <GigCard key={gig._id} gig={gig} />)}
          {/*{status === 'success' || <h2>There are no gigs</h2>}*/}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
