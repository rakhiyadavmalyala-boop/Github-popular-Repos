import './index.css'

const LanguageFilterItem = props => {
  const {filterDetails, isActive, changeLanguage} = props
  const {id, language} = filterDetails
  const activeClass = isActive ? 'active-btn' : ''

  const onClickLanguage = () => {
    changeLanguage(id)
  }

  return (
    <li>
      <button
        type="button"
        className={`language-btn ${activeClass}`}
        onClick={onClickLanguage}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
