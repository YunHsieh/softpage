import { Box, Tab, Tabs } from '@mui/material'
import { Container, ContentInput, GlobalStyle } from '../../components/note'
import * as React from 'react';


type tplotOptions = {
    [key: string]: string
}

const handlePageValue = (page: tplotOptions, index: number, newValue: string) => {
    window.localStorage.setItem('MY_PAGE_DATA', JSON.stringify(page));
    page[index] = newValue
};

interface TabPanelProps {
    children?: React.ReactNode;
    pageValue: tplotOptions;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, pageValue, value, index, ...other } = props;
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
                onInput={e => handlePageValue(pageValue, index, e.currentTarget.innerText)}
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
    const [value, setValue] = React.useState(0);
    const [pageValue, setPageValue] = React.useState({
        '0': '', 
        '1': ''
    });
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    // Only for nextjs
    React.useEffect(() => {
        const data = localStorage.getItem('MY_PAGE_DATA');
        if ( data !== null ) setPageValue(JSON.parse(data));
    },[]);

  return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 3, borderColor: 'divider' }}>
            <Tabs variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example">
            {Object.keys(pageValue).map((_, i) =>
                <Tab key={i} label="untitled" {...a11yProps(i)} />
            )}
            <Tab label="+" {...a11yProps(999999)} onClick={e => setPageValue({...pageValue, [Object.keys(pageValue).length]: ''})}/>
            </Tabs>
        </Box>
        <GlobalStyle />
        {Object.keys(pageValue).map((x, i) =>
            <TabPanel key={i} value={value} index={i} pageValue={pageValue}>
                {Object(pageValue)[x]}
            </TabPanel>
        )}
        </Box>
  )
}
