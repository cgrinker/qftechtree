import type { Meta, StoryObj } from '@storybook/react-vite';
import * as math from 'mathjs';
import { expect, userEvent, within } from 'storybook/test';
import {Box} from '@chakra-ui/react'

import { Matrix } from '@/components/matrix';

const threeXthree = math.matrix([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ]);

const meta = {
  title: 'Matrix/Matrix',
  component: Matrix,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (<Box fontSize={"24px"}><Story /></Box>)
  ]
  
} satisfies Meta<typeof Matrix>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  args: {
    matrix: threeXthree
  },
};
