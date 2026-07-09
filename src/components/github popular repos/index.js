import { Component } from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
    { id: 'ALL', language: 'All' },
    { id: 'JAVASCRIPT', language: 'Javascript' },
    { id: 'RUBY', language: 'Ruby' },
    { id: 'JAVA', language: 'Java' },
    { id: 'CSS', language: 'CSS' },
]

class GithubPopularRepos extends Component {
    state = {
        reposList: [],
        isLoading: true,
        activeLanguageId: 'ALL',
        apiStatus: 'INITIAL',
    }

    componentDidMount() {
        this.getRepos()
    }

    getRepos = async () => {
        const { activeLanguageId } = this.state
        this.setState({ isLoading: true, apiStatus: 'IN_PROGRESS' })
        const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`
        const response = await fetch(apiUrl)
        if (response.ok) {
            const data = await response.json()
            const updatedData = data.popular_repos.map(each => ({
                id: each.id,
                name: each.name,
                issuesCount: each.issues_count,
                forksCount: each.forks_count,
                starsCount: each.stars_count,
                avatarUrl: each.avatar_url,
            }))
            this.setState({
                reposList: updatedData,
                isLoading: false,
                apiStatus: 'SUCCESS',
            })
        } else {
            this.setState({ isLoading: false, apiStatus: 'FAILURE' })
        }
    }

    changeLanguage = id => {
        this.setState({ activeLanguageId: id }, this.getRepos)
    }

    renderLanguageFilters = () => {
        const { activeLanguageId } = this.state
        return (
            <ul className="language-filters">
                {languageFiltersData.map(each => (
                    <LanguageFilterItem
                        key={each.id}
                        filterDetails={each}
                        isActive={each.id === activeLanguageId}
                        changeLanguage={this.changeLanguage}
                    />
                ))}
            </ul>
        )
    }

    renderLoader = () => (
        <div data-testid="loader">
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
        </div>
    )

    renderFailureView = () => (
        <div className="failure-view">
            <img
                src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
                alt="failure view"
            />
            <h1>Something Went Wrong</h1>
        </div>
    )

    renderReposList = () => {
        const { reposList } = this.state
        return (
            <ul className="repos-list">
                {reposList.map(each => (
                    <RepositoryItem key={each.id} repoDetails={each} />
                ))}
            </ul>
        )
    }

    renderContent = () => {
        const { apiStatus } = this.state
        switch (apiStatus) {
            case 'SUCCESS':
                return this.renderReposList()
            case 'FAILURE':
                return this.renderFailureView()
            case 'IN_PROGRESS':
                return this.renderLoader()
            default:
                return null
        }
    }

    render() {
        return (
            <div className="github-popular-repos">
                <h1 className="heading">Popular</h1>
                {this.renderLanguageFilters()}
                {this.renderContent()}
            </div>
        )
    }
}

export default GithubPopularRepos
