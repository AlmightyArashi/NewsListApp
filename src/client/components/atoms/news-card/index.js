import React from 'react';
import PropTypes from 'prop-types';

import { NewsCardContainer } from './styles';

const NewsCard = ({
    article
}) => {
    const author = _.get(article, 'author', '');
    const title = _.get(article, 'title', '');
    const description = _.get(article, 'description', '');
    const link = _.get(article, 'url');
    return (
        <NewsCardContainer>
            <a href={link}>{'Go to Article'}</a>
            {!!author && (<span>{`Author: ${author}`}</span>)}
            <span>{`Title: ${title}`}</span>
            <span>{`Description: ${description}`}</span>
        </NewsCardContainer>
    );

    function handleOnClick (e) {
        if ((!max || _.get(e, ['target', 'value', 'length']) <= max) && !disabled) {
            onChange(e);
        }
    }
};

NewsCard.propTypes = {
    article: PropTypes.object,
}

NewsCard.defaultProps = {
    article: {},
}

export default NewsCard;