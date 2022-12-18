import React from "react";
import AsyncSelect from "react-select/async";
import tuxyService from "services/tuxy-service";

export default function TuxyList({ ...props }) {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = React.useState(false);

  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    tuxyService
      ?.getTuxyList("")
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
        getOptionLabel={(e) => `${e?.name}`}
        loadOptions={tuxyService?.getTuxyList}
        // isDisabled={loading}
        defaultOptions={items}
        {...props}
      />
    </div>
  );
}
