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



export const Normal = Template.bind({});
Normal.args = {
  onChange(files) {
    console.log('onChange payload', files)
  },
  onChangeBlob: undefined,
};

export const FileBlob = Template.bind({});
FileBlob.args = {
  onChange: undefined,
  onChangeBlob(blob) {
    console.log('onChangeBlob payload', blob)
  }
};