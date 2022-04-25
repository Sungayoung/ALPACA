import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Button, styled } from '@mui/material';
import React from 'react';

interface CBtnProps {
  content?: string | ReactJSXElement;
  children?: string | ReactJSXElement;
  backgroundColor?: string;
  color?: string;
  disabled?: boolean;
  width?: string | number;
  height?: string | number;
  onClick: () => void;
}

const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: '10px',
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.main,
  color: theme.palette.txt,
}));

function CBtn({
  content,
  backgroundColor = '',
  color = '',
  disabled = false,
  width = '',
  height = '',
  children,
  onClick,
}: CBtnProps) {
  return (
    <CustomButton
      sx={{
        backgroundColor: backgroundColor,
        color: color,
        width: width,
        height: height,
      }}
      disabled={disabled}
      onClick={onClick}>
      {content}
      {children}
    </CustomButton>
  );
}

export default CBtn;