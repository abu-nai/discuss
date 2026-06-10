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
}));