import React from 'react';
import styles from './Element.module.css';
import gripVertical from '../../assets/grip-vertical.svg';

const Element = ({
    id,
    title,
    type,
    setIsAElementSelected,
    setSelectedElementIndex,
}) => {
    const handleDragStart = e => {
        setIsAElementSelected(false);
        setSelectedElementIndex(-1);
        let elementMetaData = {
            id: id,
            title: title,
            type: type,
        };
        e.dataTransfer.setData(
            'application/json',
            JSON.stringify(elementMetaData)
        );
    };

    return (
        <div className={styles.element} draggable onDragStart={handleDragStart}>
            <img src={gripVertical} alt="grip-vertical" />
            {title}
        </div>
    );
};

export default Element;
