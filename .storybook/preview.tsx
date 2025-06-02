import type { Preview } from "@storybook/react";
import React from "react";
import Provider from '../src/sys/context';
// If you have a custom theme, you can import and use it here
// import theme from '../src/theme'; // Example path
import * as math from 'mathjs';



const preview: Preview = {
  decorators: [
    (Story) => React.createElement(Provider, { /* theme: theme */ }, React.createElement(Story)),
    (Story) => {
      //@ts-ignore
      window.clark = "slfkjsdlkf";
      //@ts-ignore
      window.mathjs = math;
      return <Story />
    }
  ],
  
};

export default preview;