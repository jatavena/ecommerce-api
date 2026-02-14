export const buildUpdateClause = (data) => {
  let entries = Object.entries(data);
  let params = [];
  let values = []
  let i = 0;
  entries.forEach(([key, value]) => {
    i++;
    params.push(`${key} = $${i}`);
    values.push(value); 
  });
  return {params, values, i};
};