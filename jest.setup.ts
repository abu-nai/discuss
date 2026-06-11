import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import React from 'react';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useActionState: jest.fn(() => [{ errors: {} }, jest.fn(), false]),
}));

jest.mock('@nextui-org/react', () => ({
  ...jest.requireActual('@nextui-org/react'),
  Button: ({ children, onClick, onPress }: {
    children: React.ReactNode,
    onClick?: () => void,
    onPress?: () => void
  }) => React.createElement('button', { onClick: onClick || onPress }, children),
  Textarea: ({ name, placeholder }: {
    name: string,
    placeholder: string
  }) => React.createElement('textarea', { name, placeholder }),
    Popover: ({ children }: {
    children: React.ReactNode
  }) => {
    const [open, setOpen] = React.useState(false);
    const childArray = React.Children.toArray(children);
    return React.createElement(
      'div',
      null,
      React.cloneElement(childArray[0] as React.ReactElement, {
        onClick: () => setOpen(!open)
      }),
      open ? childArray[1] : null
    );
  },
  PopoverTrigger: ({ children, onClick }: {
    children: React.ReactNode,
    onClick?: () => void
  }) => React.createElement('div', { onClick }, children),
  PopoverContent: ({ children }: {
    children: React.ReactNode
  }) => React.createElement('div', null, children),
}));