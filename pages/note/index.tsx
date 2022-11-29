import { Box, Tab, Tabs } from '@mui/material'
import { Container, ContentInput } from '../../styles/note'
import * as React from 'react';
import {v4} from 'uuid';


type tplotOptions = {
    [key: string]: {
    [key: string]: string
}}

const handlePageValue = (page: tplotOptions, index: string, newValue: string, setPageValue: React.Dispatch<React.SetStateAction<string>>) => {
    page[index].title = newValue.split('\n')[0] || 'untitled'
    page[index].content = newValue
    window.localStorage.setItem('MY_PAGE_DATA', JSON.stringify(page));
};

interface TabPanelProps {
    children?: React.ReactNode;
    pageValue: tplotOptions;
    setPageValue: React.Dispatch<React.SetStateAction<string>>;
    index: string;
    value: string;
}

function TabPanel(props: TabPanelProps) {
    const { children, setPageValue, pageValue, value, index, ...other } = props;
    return (
        <Container
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
        {value === index && (
            <ContentInput 
                contentEditable 
                suppressContentEditableWarning={true}
                onInput={e => handlePageValue(pageValue, index, e.currentTarget.innerText, setPageValue)}
            > 
            {children}
            </ContentInput>
        )}
        </Container>
    );
}
  
function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
  
export default function Home() {
    const content = {
        'title': 'untitled',
        'content': '',
    }
    const [value, setValue] = React.useState('');
    const [pageValue, setPageValue] = React.useState({});
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const handleAdd = () => {
        const pageKey = v4();
        setPageValue({...pageValue, [pageKey]: content})
        setValue(pageKey);
        window.localStorage.setItem('MY_PAGE_DATA', JSON.stringify({...pageValue, [pageKey]: content}));
    };
    
    const handleDragStart = (key: string) => (event: React.DragEvent<HTMLDivElement>) => {
        delete Object(pageValue)[key];
        setPageValue({...pageValue});
        window.localStorage.setItem('MY_PAGE_DATA', JSON.stringify(pageValue));
    };

    // Only for nextjs
    React.useEffect(() => {
        const data = localStorage.getItem('MY_PAGE_DATA');
        if ( data !== null ) {
            setPageValue(JSON.parse(data))
            // Get object data from localstoreage that have to parse
            setValue(Object.keys(JSON.parse(data))[0])
        };
    },[]);

  return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 3, borderColor: 'divider' }}>
            <Tabs variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
            >
                {Object.keys(pageValue).map((x, i) =>
                    <Tab 
                        key={x}
                        value={x}
                        onDragEnd={handleDragStart(x)}
                        draggable="true" 
                        label={Object(pageValue)[x].title || 'untitled'}
                        {...a11yProps(i)}
                    />
                )}
                <Tab 
                    label="+"
                    {...a11yProps(Infinity)} 
                    onClick={handleAdd}
                />
            </Tabs>
        </Box>
        {Object.keys(pageValue).map((x, i) =>
            <TabPanel key={x} value={value} index={x} pageValue={pageValue} setPageValue={setPageValue}>
                {Object(pageValue)[x].content}
            </TabPanel>
        )}
        </Box>
  )
}
