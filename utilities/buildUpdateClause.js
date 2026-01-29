export const buildUpdateClause = (data) => {
  let entries = Object.entries(data);
  let params = [];
  let values = []
  let i = 0;
  entries.forEach((entry) => {
    i++
    params.push(`${entry[0]} = $${i}`);
    values.push(`${entry[1]}`);
  });
  return {params, values, i};
};