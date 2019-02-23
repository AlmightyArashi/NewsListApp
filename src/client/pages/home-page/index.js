import React from 'react';

import API from '../../api';
import InputField from '../../components/atoms/input-field';
import NewsCard from '../../components/atoms/news-card';
import ListView from '../../components/molecules/list-view';
import { HomePageContainer, SearchButton } from './styles';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            prevQuery: '',
            query: '',
            articles: [],
            displayError: '',
            pageIndex: 0,
        };
    }

	render() {
        const { articles, query, displayError, pageIndex } = this.state;
        console.log("all articles", articles)
        console.log("displayError", displayError)
		return (
            <HomePageContainer className="home-page-container">
                <InputField
                    id="news-query-input"
                    placeholder="Search for news"
                    value={query}
                    disabled={false}
                    onChange={(e) => this.setState({ query: e.target.value, displayError: '' })}
                />
                <SearchButton
                    disabled={_.isEmpty(query)}
                    onClick={() => this.handleOnQueryNews(false)}
                >
                    {'Search'}
                </SearchButton>
                {_.get(articles, 'length') > 0 && (
                    <ListView
                        items={articles}
                        onDrop={() => {}}
                        pageIndex={pageIndex}
                        onRenderItem={this.renderNewsCard}
                        onLoadMoreItems={() => this.handleOnQueryNews(true)}
                        onGoPreviousPage={() => this.setState(({ pageIndex }) => ({ pageIndex: pageIndex - 1 }))}
                        onGoNextPage={() => this.setState(({ pageIndex }) => ({ pageIndex: pageIndex + 1 }))}
                    />
                )}
                {!_.isEmpty(displayError) && (<span>{displayError}</span>)}
            </HomePageContainer>
		);
    }

    renderNewsCard (article) {
        return (
            <NewsCard article={article}/>
        );
    }

    handleOnQueryNews = (keepCurrentQuery = false) => {
        const { prevQuery, query, articles } = this.state;
        // The current article count will be reset if we do not keep current query (non pagination)
        const articlesCount = keepCurrentQuery ? _.get(articles, 'length', 0) : 0;
        const pageRequest = (articlesCount / 20) + 1;
        // The passed in query will be previousQuery if keepCurrentQuery is true (pagination)
        return API.NewsAPI.GetAllNews(keepCurrentQuery ? prevQuery : query, pageRequest)
            .then((nextArticles) => {
                const hasNextArticles = _.get(nextArticles, 'length') > 0;
                if (hasNextArticles || keepCurrentQuery) {
                    this.setState((prevState) => ({
                        // We will only concat the articles if this is a pagination request
                        articles: keepCurrentQuery
                            ? _.get(prevState, 'articles', []).concat(nextArticles)
                            : nextArticles,
                        // We will keep previous query if it was a pagination request, otherwise update to current query
                        prevQuery: keepCurrentQuery ? _.get(prevState, 'prevQuery', '') : query,
                        displayError: '',
                        pageIndex: keepCurrentQuery ? _.get(prevState, 'pageIndex', 0) : 0,
                    }));
                } else {
                    this.setState({ displayError: `No Articles related to "${query}". Please search for another topic.` })
                }
            })
            .catch(() => this.setState({ displayError: 'Failed to get articles from Awesome News.com!' }));
    }
}

export default HomePage;