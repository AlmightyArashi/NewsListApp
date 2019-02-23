import _ from 'lodash';
import NewsAPI from 'newsapi';

const apiKey = '6d895d030c5c4217bbf7e3c55917f5d5';
const apiRequest = new NewsAPI(apiKey);

const GetTopHeadlines = (query) =>
    apiRequest.v2.topHeadlines({
        q: query,
        category: 'politics',
        language: 'en',
        country: 'us'
    })
    .then(response => {
        console.log(response);
        return response;
        /*
        {
            status: "ok",
            articles: [...]
        }
        */
    });

const GetAllNews = (query, offset) =>
    apiRequest.v2.everything({
        q: query,
        sources: 'bbc-news,the-verge',
        domains: 'bbc.co.uk,techcrunch.com',
        from: '2019-01-23',
        to: '2019-02-23',
        language: 'en',
        sortBy: 'relevancy',
        page: offset,
    }).then(response => _.get(response, 'articles', []));

export default {
    GetTopHeadlines,
    GetAllNews,
};