import { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css';
import Layout from './Layout/Layout';
import MainPage from './Layout/MainPage/MainPage';
import EditModal from './components/EditModal/EditModal';
import { localStorageKeys } from './constants/LocalStorageKeys';

function App() {
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [pageData, setPageData] = useState([]);
    const [editModalObj, setEditModalObj] = useState({});
    const [isAElementSelected, setIsAElementSelected] = useState(false);
    const [selectedElementIndex, setSelectedElementIndex] = useState(-1);

    useEffect(() => {
        setupPage();
        document.body.addEventListener('click', () => {
            setIsAElementSelected(false);
            setSelectedElementIndex(-1);
        });
        return () => {
            document.body.removeEventListener('click', () => {});
        };
    }, []);

    const setupPage = () => {
        let prevPageDataJsonStr = localStorage.getItem(
            localStorageKeys.PAGEELEMENTS
        );
        let savedPageData = JSON.parse(prevPageDataJsonStr);
        if (savedPageData) {
            setPageData(savedPageData);
        }
    };

    return (
        <AppMainContainer>
            <Layout
                setIsAElementSelected={setIsAElementSelected}
                setSelectedElementIndex={setSelectedElementIndex}>
                <MainPage
                    pageData={pageData}
                    setPageData={setPageData}
                    setIsEditModalVisible={setIsEditModalVisible}
                    setEditModalObj={setEditModalObj}
                    isAElementSelected={isAElementSelected}
                    setIsAElementSelected={setIsAElementSelected}
                    selectedElementIndex={selectedElementIndex}
                    setSelectedElementIndex={setSelectedElementIndex}
                />
            </Layout>
            {isEditModalVisible && (
                <Overlay onClick={e => e.stopPropagation()}>
                    <EditModal
                        editModalObj={editModalObj}
                        pageData={pageData}
                        setPageData={setPageData}
                        setIsEditModalVisible={setIsEditModalVisible}
                        isAElementSelected={isAElementSelected}
                        setIsAElementSelected={setIsAElementSelected}
                        selectedElementIndex={selectedElementIndex}
                        setSelectedElementIndex={setSelectedElementIndex}
                    />
                </Overlay>
            )}
        </AppMainContainer>
    );
}

const AppMainContainer = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
`;

const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
`;

export default App;
