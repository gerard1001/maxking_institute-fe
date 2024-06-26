import React from "react";

function IndeterminateCheckbox({ indeterminate, ...rest }: any) {
  const ref: any = React.useRef(null);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return <input type="checkbox" ref={ref} {...rest} />;
}

export default IndeterminateCheckbox;
