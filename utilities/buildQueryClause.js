export const buildQueryClause = (data) => {
  let keys = [];
  let values = []
  let i = 0;
  Object.entries(data).forEach(([key, value]) => {
    i++;
    keys.push([key, `$${i}`]);
    if (key === 'customer_id' || key === 'created_at') {
      values.push(value);
    }
    if (key !== 'customer_id' && key !== 'created_at') {
      values.push(`%${value}%`);
    }
  });
  let queryObject = {
    keys: keys,
    values: values,
    i: i
  };
  return(queryObject);
}