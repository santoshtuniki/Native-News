// module imports
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// component import
import AuthStack from '@Navigation/AuthStack';

const RootNavigation = () => {
    return (
        <NavigationContainer>
            <AuthStack />
        </NavigationContainer>
    );
};

export default RootNavigation;
