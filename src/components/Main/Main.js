import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRepos } from '../actions/repos';
import { setCurrentPage } from '../../reducers/reposReducers';
import { createPages } from '../../utils/pagesCreator';
import './Main.css';
import Repo from '../Repo/Repo';
import Spinner from '../Spinner/Spinner';

function Main() {
  const dispatch = useDispatch();
  const repos = useSelector(state => state.repos.items);
  const isFetching = useSelector(state => state.repos.isFetching);
  const currentPage = useSelector(state => state.repos.currentPage);
  const perPage = useSelector(state => state.repos.perPage);
  const totalCount = useSelector(state => state.repos.totalCount);
  const [searchValue, setSearchValue] = useState('');
  const pagesCount = Math.ceil(totalCount / perPage);

  
  const pages = [];
  createPages(pages, pagesCount, currentPage);

  useEffect(() => {
    dispatch(getRepos(searchValue, currentPage, perPage));
  }, [currentPage])

  const searchHandler = () => {
    dispatch(setCurrentPage(1));
    dispatch(getRepos(searchValue, currentPage, perPage));
  }

  return (
    <div className='main'>
      <div className="search">
        <input 
          className='search-input' 
          value={searchValue}
          type="text" 
          placeholder='input repo name'
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button 
          className='search-btn'
          onClick={() => searchHandler()}
        >
            Search
        </button>  
      </div>

      {
        isFetching === false
          ? repos.map((repo, index) => <Repo 
              key={index} 
              repo={repo} />) 
          : <Spinner />
      }
      
      <div className="pages">
        {pages.map((page, index) => <span 
          key={index} 
          className={currentPage === page ? 'current-page' : 'page'}
          onClick={() => dispatch(setCurrentPage(page))}>
            {page}
        </span>)}
      </div>

    </div>
  )
}

export default Main;
