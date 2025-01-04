// components/CustomButton.tsx
import React, { ReactNode } from 'react';

type IAButtonProps = {
  color?: string;
  onClick?: () => void;
  children: ReactNode;
};

const IAButton: React.FC<IAButtonProps> = ({ color = '#007BFF', onClick = () => {}, children }) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: color,
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
      }}
    >
      {children}
    </button>
  );
};

export default IAButton;
