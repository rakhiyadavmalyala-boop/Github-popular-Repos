import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = repoDetails

  return (
    <li className="repo-card">
      <img src={avatarUrl} alt={name} className="avatar" />
      <h1 className="repo-name">{name}</h1>
      <div className="repo-stats">
        <div className="stat">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="icon"
          />
          <p>{starsCount} stars</p>
        </div>
        <div className="stat">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="icon"
          />
          <p>{forksCount} forks</p>
        </div>
        <div className="stat">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="icon"
          />
          <p>{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem


export default RepositoryItem
