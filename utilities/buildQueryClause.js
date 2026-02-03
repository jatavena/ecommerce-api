export const buildQueryClause = (data) => {
  let keys = [];
  let values = []
  let i = 0;
  Object.entries(data).forEach(([key, value]) => {
    i++;
    keys.push([key, `$${i}`]);
    values.push(`%${value}%`);
  });
  let queryObject = {
    keys: keys,
    values: values,
    i: i
  };
  return(queryObject);
}