/* eslint-disable jsx-a11y/alt-text */
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import Pagination from 'react-responsive-pagination';
import useDebounce from "../../hooks/useDebounce";
import { findByTitle } from "../../services/getvideo";
import styles from "./styles.module.scss";
import logo from '../../logo.svg'; 

type Props = {};

const Main: React.FC<Props> = () => {
  const [videos, setVideos] = useState([]);
  const [searchText, setSearchText] = useState("");
  const searchTitle = useDebounce(searchText, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(100);

  const onChangeSearchText: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchText(e.target.value);
  };

  const pagechange = (page:number) => {
    setCurrentPage(page);
    getvideos(searchTitle, page);
  };

  useEffect(() => {
    getvideos(searchTitle, currentPage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTitle]);

  const getvideos = (searchTitle:string, currentPage:number) => {
    findByTitle( searchTitle, currentPage )
    .then((response: any) => {
      if(response.data.Response === "True"){
        setTotalPages( Math.ceil( response.data.totalResults / 10 ));
        setVideos( response.data.Search );
      }else{
        setVideos([]);
        setTotalPages(0);
      }
    })
    .catch((e: Error) => {
      console.log(e);
    });
  };

  return (
    <div className="row">
      <div className="col-md-12 mt-2">
        <div className="input-group mb-2 text-center">
          <a target="_blank" href="https://github.com/Astro2020-lovely/omdb-test-react" rel="noreferrer">Source Code</a>
        </div>
      </div>
      <div className="col-md-12 mt-2">
        <div className="input-group mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchText}
            onChange={onChangeSearchText}
          />
        </div>
      </div>
      <div className="col-md-12 p-3">
        {videos.length ? (
          <div>
            <div className="row">
              {videos?.map((content, idx) => (
                <div key={idx} className="col-md-6 mt-2">
                  <div className="card">
                    <div className={classNames(styles.cardhorizontal)}>
                        <div className={classNames(styles.imgwrapper)}>
                            <img src={content['Poster'] === 'N/A' ? logo : content['Poster'] } className={classNames("card-img", styles.imgvideo)} />
                        </div>
                        <div className={classNames("card-body", styles.girdbody)}>
                            <h6 className="card-title">{content['Title']}</h6>
                            <p className="card-text">{content['Year']}</p>
                        </div>
                    </div>
                  </div>  
                </div>
              ))}
            </div>
            <div className="row"> 
              <div className="col-md-12 p-3 mt-3">
                <Pagination
                  current={currentPage}
                  total={totalPages}
                  onPageChange={pagechange}
                />
              </div>
            </div>
          </div>
        ) : (<div>No Result</div>)}
      </div>
    </div>
  );
};

export default Main;
