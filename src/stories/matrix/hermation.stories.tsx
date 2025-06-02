import type { Meta, StoryObj } from '@storybook/react-vite';
import * as math from 'mathjs';
import { expect, userEvent, within } from 'storybook/test';
import * as mats from '@/components/matrix/constants';
import { HermationExplained } from '@/components/matrix';
import {Box} from '@chakra-ui/react'

const e = math.evaluate;

const get_rotated = math.matrix([
  [e("1i"), e("-2i"), e("3i"), e("-4i")],
  [e("5i"), e("-6i"), e("7i"), e("-8i")],
  [e("9i"), e("-10i"), e("11i"), e("-12i")],
  [e("13i"), e("-14i"), e("15i"), e("-16i")],
])

const meta = {
  title: 'Matrix/Hermation',
  component: HermationExplained,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [
      (Story) => (<Box fontSize={"24px"}><Story /></Box>)
  ]
} satisfies Meta<typeof HermationExplained>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  args: {
    lhs: get_rotated,
  }
};
