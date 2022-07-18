import styled from 'styled-components'
import UploadIcon from '../UploadIcon'
import InsertDriveFileIcon from '../InsertDriveFileIcon'
import SimCardError from '../SimCardError'
import ClearIcon from '../ClearIcon'

export const FileInputContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  line-height: 1.5em;

  &.FileInputContainer-error {
    outline-color: crimson;
  }

  &::after {
    position: absolute;
    width: 100%;
    height: 100%;
    content: ' ';
    background-color: currentColor;
    outline-offset: -2px;
    pointer-events: none;
    opacity: 0.05;
  }
`
export const FileInputLabel = styled.label`
  display: flex;
  box-sizing: inherit;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
  opacity: 0.75;
  cursor: pointer;
  transition: opacity 0.25s ease-in-out, color 0.25s ease-in-out, outline-color 0.25s ease-in-out;
  outline: 2px currentColor dashed;
  outline-offset: -2px;

  &:hover {
    opacity: 1;
    color: #5b77d2;
  }

  .FileInputContainer.FileInputContainer-file & {
    color: #029d5e;
  }

  .FileInputContainer.FileInputContainer-error & {
    color: crimson;
  }

  .FileInputContainer.FileInputContainer-dragOver & {
    color: blueviolet;
  }
`

export const HiddenInput = styled.input`
  display: none;
`
export const MutedText = styled.span`
  opacity: 0.5;
  font-size: 0.8em;
`

export const ErrorMessage = styled.span`
  font-size: 0.8em;
  background: crimson;
  color: #fff;
  padding: 0 0.5em;
`
export const StyledUploadIcon = styled(UploadIcon)`
  font-size: 4em;
`

export const StyledFileIcon = styled(InsertDriveFileIcon)`
  font-size: 4em;
`

export const StyledErrorIcon = styled(SimCardError)`
  font-size: 4em;
`

export const ClearInputButton = styled.span`
  border: 0;
  background-color: transparent;
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 4px;
  border-radius: 11px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color .25s ease-in-out;
  color: rgba(0, 0, 0, 0.55);
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`

export const StyledClearIcon = styled(ClearIcon)``
