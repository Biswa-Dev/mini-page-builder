import React, { useState, useEffect } from 'react';
import styles from './Main.module.css';
import ElementTypes from '../../constants/EelementTypes';
import { localStorageKeys } from '../../constants/LocalStorageKeys';

const MainPage = ({
    pageData,
    setPageData,
    setIsEditModalVisible,
    setEditModalObj,
    isAElementSelected,
    setIsAElementSelected,
    selectedElementIndex,
    setSelectedElementIndex,
}) => {
    const handleDrop = e => {
        e.preventDefault();
        if (e.dataTransfer.getData('application/json')) {
            const elementMetaDataJsonStr =
                e.dataTransfer.getData('application/json');
            const elementMetaData = JSON.parse(elementMetaDataJsonStr);
            setEditModalObj({
                type: elementMetaData.type,
                defaultText: elementMetaData.title,
                defaultX: e.clientX,
                defaultY: e.clientY,
                defaultFontSize: 16,
                defaultFontWeight: 400,
            });
            setIsEditModalVisible(true);
        }
    };

    const handleDragOver = e => {
        e.preventDefault();
    };

    const handleElementClick = e => {
        e.stopPropagation();
        e.preventDefault();
        if (e.target.dataset.id) {
            setIsAElementSelected(true);
            setSelectedElementIndex(Number(e.target.dataset.id));
            console.log(`[Clicked element id] ${Number(e.target.dataset.id)}`);
        }
    };

    const handleElementDragEnd = (e, index) => {
        e.preventDefault();
        setPageData(prevPageData => {
            const currentPageElements = [...prevPageData];
            currentPageElements[index] = {
                ...currentPageElements[index],
                x: e.clientX,
                y: e.clientY,
            };
            localStorage.setItem(
                localStorageKeys.PAGEELEMENTS,
                JSON.stringify(currentPageElements)
            );
            return currentPageElements;
        });
    };

    const handleKeyDown = e => {
        console.log('Inside handleKeyDown');
        e.preventDefault();
        if (
            e.key === 'Enter' &&
            isAElementSelected &&
            selectedElementIndex >= 0
        ) {
            setIsEditModalVisible(true);
        }
        if (
            e.key === 'Delete' &&
            isAElementSelected &&
            selectedElementIndex >= 0
        ) {
            deleteSelectedElement();
        }
    };

    const deleteSelectedElement = () => {
        let updatedPageData = pageData.filter((element, index) => {
            if (selectedElementIndex !== index) return element;
        });
        setPageData(updatedPageData);
        localStorage.setItem(
            localStorageKeys.PAGEELEMENTS,
            JSON.stringify(updatedPageData)
        );
    };

    return (
        <div
            className={styles.mainPage}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={handleElementClick}
            onKeyDown={handleKeyDown}>
            {pageData.map((element, index) => {
                if (element.type === ElementTypes.LABEL) {
                    return (
                        <span
                            className={styles.label}
                            key={index}
                            data-id={`${index}`}
                            tabIndex={0}
                            style={{
                                position: 'absolute',
                                top: Number(element.y),
                                left: Number(element.x),
                                fontSize: Number(element.fontSize),
                                fontWeight: `${element.fontWeight}`,
                                border:
                                    selectedElementIndex === index &&
                                    `2px solid #D95409`,
                            }}
                            draggable
                            onDragEnd={e => {
                                handleElementDragEnd(e, index);
                            }}
                            onKeyDown={handleKeyDown}>
                            {element.text}
                        </span>
                    );
                }
                if (element.type === ElementTypes.INPUT) {
                    return (
                        <input
                            key={index}
                            data-id={`${index}`}
                            name={element.text}
                            style={{
                                position: 'absolute',
                                top: Number(element.y),
                                left: Number(element.x),
                                fontSize: Number(element.fontSize),
                                fontWeight: `${element.fontWeight}`,
                                border:
                                    selectedElementIndex === index &&
                                    `2px solid #D95409`,
                            }}
                            draggable
                            onDragEnd={e => handleElementDragEnd(e, index)}
                        />
                    );
                }
                if (element.type === ElementTypes.BUTTON) {
                    return (
                        <button
                            key={index}
                            data-id={`${index}`}
                            style={{
                                position: 'absolute',
                                top: Number(element.y),
                                left: Number(element.x),
                                fontSize: Number(element.fontSize),
                                fontWeight: `${element.fontWeight}`,
                                border:
                                    selectedElementIndex === index &&
                                    `2px solid #D95409`,
                            }}
                            draggable
                            onDragEnd={e => handleElementDragEnd(e, index)}>
                            {element.text}
                        </button>
                    );
                }
            })}
        </div>
    );
};

export default MainPage;
