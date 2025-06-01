import type { Meta, StoryObj } from '@storybook/react-vite';
import * as math from 'mathjs';
import { expect, userEvent, within } from 'storybook/test';
import * as mats from '@/components/matrix/constants';
import { TensorProduct } from '@/components/matrix';
import {Box} from '@chakra-ui/react'



const meta = {
  title: 'Matrix/TensorProduct',
  component: TensorProduct,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [
      (Story) => (<Box fontSize={"24px"}><Story /></Box>)
  ]
} satisfies Meta<typeof TensorProduct>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  args: {
    lhs: mats.pauli_x,
    rhs: mats.pauli_y,
  }
};
