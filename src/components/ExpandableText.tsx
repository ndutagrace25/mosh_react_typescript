import { useState } from "react";

interface Props {
  children: string;
  maxChars?: number;
}

const ExpandableText = ({ children, maxChars = 10 }: Props) => {
  const [isExpanded, setExpanded] = useState(false);
  return (
    <div>
      {children.length <= maxChars ? (
        <p>{children}</p>
      ) : (
        <div>
          <p>{isExpanded ? children : children.substring(0, maxChars)}...</p>
          <button onClick={() => setExpanded(!isExpanded)}>
            {isExpanded ? "Less" : "More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ExpandableText;
