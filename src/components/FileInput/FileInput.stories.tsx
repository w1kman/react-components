import { ComponentStory, ComponentMeta } from '@storybook/react'
import FileInput from './FileInput'

/* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */

export default {
  title: 'ComponentLib/FileInput',
  component: FileInput,
}

const Template: ComponentStory<typeof FileInput> = (args) => (
  <FileInput {...args} />
)

export const HelloWorld = Template.bind({});
HelloWorld.args = {
  id: "cool-id",
};

export const ClickMe = Template.bind({});
ClickMe.args = {
  children: "Click me!",
};