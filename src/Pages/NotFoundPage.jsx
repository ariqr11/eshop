import React from 'react';
import { Text } from '@chakra-ui/react';
import NavbarComponent from '../Components/NavbarBlack';

const NotFoundPage = (props) => {
    return <div className='container'>
        <NavbarComponent />
        <Text textAlign='center' fontSize='6xl'>
            PAGE NOT FOUND
        </Text>
    </div>
}

export default NotFoundPage;