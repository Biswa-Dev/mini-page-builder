import React from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar/Sidebar';

const Layout = ({
    children,
    setIsAElementSelected,
    setSelectedElementIndex,
}) => {
    return (
        <LayoutContainer>
            <PageContainer>{children}</PageContainer>
            <SidebarContainer>
                <Sidebar
                    setIsAElementSelected={setIsAElementSelected}
                    setSelectedElementIndex={setSelectedElementIndex}
                />
            </SidebarContainer>
        </LayoutContainer>
    );
};

const LayoutContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: space-between;
    position: relative;
`;

const PageContainer = styled.div`
    width: calc(100% - 20rem);
    height: 100%;
`;

const SidebarContainer = styled.div`
    width: 20rem;
    height: 100%;
`;

export default Layout;
