import React from 'react';
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { SxProps } from '@mui/system';

interface MainCardProps {
  border?: boolean;
  boxShadow?: boolean;
  children: React.ReactNode;
  content?: boolean;
  contentClass?: string;
  contentSX?: SxProps;
  darkTitle?: boolean;
  secondary?: React.ReactNode;
  shadow?: string;
  sx?: SxProps;
  title?: React.ReactNode;
}

const headerSX = {
  '& .MuiCardHeader-action': { mr: 0 },
};

const MainCard = React.forwardRef<HTMLDivElement, MainCardProps>(
  (
    {
      border = false,
      boxShadow,
      children,
      content = true,
      contentClass = '',
      contentSX = {},
      darkTitle,
      secondary,
      shadow,
      sx = {},
      title,
      ...others
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        {...others}
        sx={{
          border: border ? '1px solid' : 'none',
          borderColor: 'divider',
          ':hover': {
            boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit',
          },
          ...sx,
        }}
      >
        {!darkTitle && title && <CardHeader sx={headerSX} title={title} action={secondary} />}
        {darkTitle && title && (
          <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary} />
        )}

        {title && <Divider />}

        {content && (
          <CardContent sx={contentSX} className={contentClass}>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

export default MainCard;
