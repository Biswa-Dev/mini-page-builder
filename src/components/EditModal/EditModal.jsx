import React, { useEffect, useRef } from 'react';
import style from './EditModal.module.css';
import ModalField from '../ModalField/ModalField';
import { localStorageKeys } from '../../constants/LocalStorageKeys';

const EditModal = ({
    editModalObj,
    pageData,
    setPageData,
    setIsEditModalVisible,
    isAElementSelected,
    setIsAElementSelected,
    selectedElementIndex,
    setSelectedElementIndex,
}) => {
    const textRef = useRef(null);
    const xRef = useRef(null);
    const yRef = useRef(null);
    const fontSizeRef = useRef(null);
    const fontWeight = useRef(null);

    useEffect(() => {
        if (!isAElementSelected && selectedElementIndex < 0) {
            textRef.current.value = editModalObj.defaultText;
            xRef.current.value = editModalObj.defaultX;
            yRef.current.value = editModalObj.defaultY;
            fontSizeRef.current.value = editModalObj.defaultFontSize;
            fontWeight.current.value = editModalObj.defaultFontWeight;
        } else {
            textRef.current.value = pageData[selectedElementIndex].text;
            xRef.current.value = pageData[selectedElementIndex].x;
            yRef.current.value = pageData[selectedElementIndex].y;
            fontSizeRef.current.value = pageData[selectedElementIndex].fontSize;
            fontWeight.current.value =
                pageData[selectedElementIndex].fontWeight;
        }
    }, []);

    const handleSubmit = e => {
        if (
            textRef.current.value &&
            xRef.current.value &&
            yRef.current.value &&
            fontSizeRef.current.value &&
            fontWeight.current.value
        ) {
            if (!isAElementSelected && selectedElementIndex < 0) {
                const currentElementMeta = {
                    type: editModalObj.type,
                    text: textRef.current.value,
                    x: xRef.current.value,
                    y: yRef.current.value,
                    fontSize: fontSizeRef.current.value,
                    fontWeight: fontWeight.current.value,
                };
                setPageData([...pageData, currentElementMeta]);
                localStorage.setItem(
                    localStorageKeys.PAGEELEMENTS,
                    JSON.stringify([...pageData, currentElementMeta])
                );
            } else {
                let upadatedPageData = pageData.map((element, index) => {
                    if (selectedElementIndex === index) {
                        return {
                            type: element.type,
                            text: textRef.current.value,
                            x: xRef.current.value,
                            y: yRef.current.value,
                            fontSize: fontSizeRef.current.value,
                            fontWeight: fontWeight.current.value,
                        };
                    } else {
                        return element;
                    }
                });
                setPageData(upadatedPageData);
                localStorage.setItem(
                    localStorageKeys.PAGEELEMENTS,
                    JSON.stringify(upadatedPageData)
                );
            }
            setIsEditModalVisible(false);
        } else {
            alert('Please fill all the required fields.');
        }
    };

    return (
        <div className={style.editModal} onClick={e => e.stopPropagation()}>
            <div className={style.modalHeader}>
                <h4>Edit {editModalObj.type}</h4>
            </div>
            <div className={style.modalForm}>
                <ModalField title={'Text'} type="text" ref={textRef} />
                <ModalField title={'X'} type="number" ref={xRef} />
                <ModalField title={'Y'} type="number" ref={yRef} />
                <ModalField
                    title={'Font Size'}
                    type="number"
                    ref={fontSizeRef}
                />
                <ModalField
                    title={'Font Weight'}
                    type="number"
                    ref={fontWeight}
                />
                <button className={style.saveBtn} onClick={handleSubmit}>
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default EditModal;
