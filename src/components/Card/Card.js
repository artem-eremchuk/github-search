import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { getContributors, getCurrentRepo } from '../actions/repos';
import './Card.css';

 function Card() {
  const history = useHistory();
  const {username, reponame} = useParams();
  const [repo, setRepo] = useState({owner: {}});
  const [contributors, setContributors] = useState([]);

  console.log(repo)

  useEffect(() => {
    getCurrentRepo(username, reponame, setRepo);
    getContributors(username, reponame, setContributors);
  }, [])

  return (
    <div className='card-wrapper'>
      <button 
        className='card-back-btn'
        onClick={() => history.goBack()}>
          Go Back
      </button>
      <div className="card">
        <img src={repo.owner.avatar_url} alt="" className="card-avatar" />
        <div className="card-info">
          <div className="card-name">{repo.name}</div>
          <div className="card-stars">Stars: {repo.stargazers_count}</div>
          {contributors.map((c, index) => <div className='c-item' key={index}>{index + 1} {c.login}</div>)}
        </div>
      </div>
    </div>
  )
}

export default Card;