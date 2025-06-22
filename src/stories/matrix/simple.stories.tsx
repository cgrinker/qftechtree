import type { Meta, StoryObj } from '@storybook/react-vite';
import {Box, Button} from '@chakra-ui/react';
import Provider from '../../sys/context';
import React from 'react';
import { api } from '@/util/rpc';






function HelloWorld() {

  function handleClick() {
    api.commands.executeCommand("workbench.action.showCommands");
  }


  return (
    <Box bgColor={"blue.500"}>Hello World 3

      <Button colorScheme='blue' onClick={handleClick}>Open Command Pallete</Button>
    </Box>
  )
}


const meta = {
  title: 'Simple/HelloWorld',
  component: HelloWorld,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },


  // decorators: [
  //   (Story) => ( 
  //     <Provider>
  //       <Story /> 
  //     </Provider>
  //   )
  // ]
  
} satisfies Meta<typeof HelloWorld>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {

};
