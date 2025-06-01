import type { Meta, StoryObj } from '@storybook/react-vite';
import * as math from 'mathjs';
import {Box} from '@chakra-ui/react'

import * as mats from '@/components/matrix/constants';

import { MatrixStack } from '@/components/matrix';

const meta = {
  title: 'Matrix/Stack',
  component: MatrixStack,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [
      (Story) => (<Box fontSize={"24px"}><Story /></Box>)
  ],
} satisfies Meta<typeof MatrixStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PauliMatricies: Story = {
  args: {
    matricies: [
      mats.pauli_x,
      mats.pauli_y,
      mats.pauli_z
    ],
  }
};
