import * as R from "ramda";

export default ({ index, value, array }) =>
  array.map((arrayValue, arrayIndex) =>
    R.equals(index, arrayIndex) ? value : arrayValue
  );
