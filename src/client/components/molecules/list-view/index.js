import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { PaginationContainer, PaginationButton } from './styles';

const PAGE_SIZE = 10;

class ListView extends React.Component {
    constructor (props) {
        super(props)
    }

    onBeforeDragStart = () => {
        /*...*/
    };

    onDragStart = () => {
        /*...*/
    };
    onDragUpdate = () => {
        /*...*/
    };
    onDragEnd = () => {
        const { onDrop } = this.props;
        // the only one that is required
    };

    render() {
        const { items, pageIndex } = this.props;
        const indexStart = pageIndex * PAGE_SIZE;
        const pageItems = _.slice(items, indexStart, indexStart + PAGE_SIZE);
        console.log("pageItems", pageItems)

        return (
            <React.Fragment>
                <PaginationContainer>
                    {pageIndex > 0 && (<PaginationButton onClick={this.handleOnClickPreviousPage}>{'Previous Page'}</PaginationButton>)}
                    {`Page ${pageIndex + 1}`}
                    <PaginationButton onClick={this.handleOnClickNextPage}>{'Next Page'}</PaginationButton>
                </PaginationContainer>
                <DragDropContext
                    onBeforeDragStart={this.onBeforeDragStart}
                    onDragStart={this.onDragStart}
                    onDragUpdate={this.onDragUpdate}
                    onDragEnd={this.onDragEnd}
                >
                    <Droppable droppableId="droppable-1" type="PERSON">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
                                {...provided.droppableProps}
                            >
                                {provided.placeholder}
                                {this.renderChildren(pageItems)}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </React.Fragment>
        );
    }

    renderChildren (items) {
        const { onRenderItem } = this.props;
        return _.map(items, (item, index) => (
            <Draggable
                key={`draggable-${index}`}
                draggableId={`draggable-${index}`}
                index={index}
            >
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        {onRenderItem(item)}
                    </div>
                )}
            </Draggable>
        ));
    }

    handleOnClickPreviousPage = () => {
        const { pageIndex } = this.props;
        if (pageIndex > 0) {
            this.props.onGoPreviousPage();
        }
    }

    handleOnClickNextPage = () => {
        const { items, pageIndex, onGoNextPage } = this.props;
        const makeRequest = (pageIndex + 1) * PAGE_SIZE >= _.get(items, 'length');
        if (makeRequest) {
            this.props.onLoadMoreItems().then(() => onGoNextPage());
        } else {
            onGoNextPage();
        }
    }
};

ListView.propTypes = {
    items: PropTypes.array,
    pageIndex: PropTypes.number,
    onDrop: PropTypes.func.isRequired,
    onRenderItem: PropTypes.func.isRequired,
    onLoadMoreItems: PropTypes.func.isRequired,
};

ListView.defaultProps = {
    pageIndex: 0,
    items: [],
};

export default ListView;