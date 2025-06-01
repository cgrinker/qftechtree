import type { Preview } from "@storybook/react";
import React from "react";
import Provider from '../src/sys/context';
// If you have a custom theme, you can import and use it here
// import theme from '../src/theme'; // Example path

const preview: Preview = {
  decorators: [
    (Story) => React.createElement(Provider, { /* theme: theme */ }, React.createElement(Story)),
  ],
};

export default preview;