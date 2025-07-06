import React from 'react';

interface FeatureTagProps {
  text: string;
}

const FeatureTag: React.FC<FeatureTagProps> = ({ text }) => {
  return (
    <span className="px-3 py-1 text-xs rounded bg-slate-100">
      {text}
    </span>
  );
};

export default FeatureTag;
