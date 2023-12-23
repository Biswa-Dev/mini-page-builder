import React from 'react';
import styled from 'styled-components';
import Element from '../../components/Element/Element';
import ElementTypes from '../../constants/EelementTypes';
import { localStorageKeys } from '../../constants/LocalStorageKeys';

const Sidebar = ({ setIsAElementSelected, setSelectedElementIndex }) => {
    const sidebarElements = [
        {
            id: 1,
            title: 'Label',
            type: ElementTypes.LABEL,
        },
        {
            id: 2,
            title: 'Input',
            type: ElementTypes.INPUT,
        },
        {
            id: 3,
            title: 'Button',
            type: ElementTypes.BUTTON,
        },
    ];

    const handleExport = () => {
        const savedPageDataStr = localStorage.getItem(
            localStorageKeys.PAGEELEMENTS
        );
        if (savedPageDataStr) {
            const blob = new Blob([savedPageDataStr], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Mini-page-layout.txt';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } else {
        }
    };

    return (
        <SidebarComponent>
            <SidebarBody>
                <h3 style={{ color: '#ffffff', marginBottom: '1rem' }}>
                    BLOCKS
                </h3>
                {sidebarElements.map(element => (
                    <Element
                        key={element.id}
                        id={element.id}
                        title={element.title}
                        type={element.type}
                        setIsAElementSelected={setIsAElementSelected}
                        setSelectedElementIndex={setSelectedElementIndex}
                    />
                ))}
            </SidebarBody>
            <ExportButton onClick={handleExport}>Export</ExportButton>
        </SidebarComponent>
    );
};

const SidebarComponent = styled.div`
    width: 100%;
    height: 100%;
    background: #2d2d2d;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const SidebarBody = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const ExportButton = styled.button`
    width: 100%;
    height: 2.5rem;
    border: none;
    outline: none;
    background: #0044c1;
    color: #ffffff;
    border-radius: 0.25rem;
    font-size: 1rem;
`;

export default Sidebar;
