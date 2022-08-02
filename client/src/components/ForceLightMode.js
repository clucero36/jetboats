import { useEffect } from 'react'
import { useColorMode } from '@chakra-ui/react';

// temporary fix for chakra dark mode bug 
// found @ https://github.com/chakra-ui/chakra-ui/issues/4987
function ForceLightMode(props) {
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (colorMode === "light") return;
    toggleColorMode();
  }, [colorMode, toggleColorMode]);

  return props.children;
}

export default ForceLightMode;