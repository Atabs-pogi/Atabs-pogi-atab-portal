import React from "react";
import AsyncSelect from "react-select/async";
import fiberService from "services/fiber-service";

export default function SelectFiberCopy() {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = React.useState(false);

  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    fiberService
      ?.searchFiber("")
      .then((i) => {
        setItems(i);
      })
      .finally(() => {
        // setLoading(false);
      });
  }, []);

  return (
    <div>
      <AsyncSelect
        getOptionLabel={(e) => `${e?.name} ${e?.grade}`}
        loadOptions={fiberService?.searchFiber}
        // isDisabled={loading}
        defaultOptions={items}
      />
    </div>
  );
}
