import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core/";
import { countries } from "../../api/index";
const CountryPicker = (props) => {
  const [fetchCountries, setCountries] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      setCountries(await countries());
    };

    fetchAPI();
  }, [setCountries]);

  return (
    <div>
      <FormControl>
        <NativeSelect
          defaultValue=""
          onChange={(e) => props.change(e.target.value)}
        >
          <option value="">Global</option>
          {fetchCountries.map((data, index) => (
            <option key={index} value={data}>
              {data}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </div>
  );
};

export default CountryPicker;
