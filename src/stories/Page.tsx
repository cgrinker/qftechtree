import { Box, Text } from '@chakra-ui/react';
import { MathJax } from 'better-react-mathjax';
import React from 'react';


export const Page: React.FC = () => {

  return (
    <Box>
      <Text fontSize="2xl">
          <MathJax>{"\\(\\frac{10}{4x} \\approx 2^{12}\\)"}</MathJax>
       </Text>
    </Box>
  );
};
