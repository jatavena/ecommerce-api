export const createDataObject = (body) => {
    let dataObject = {};
    Object.entries(body).forEach(([key, value]) => {
    if (value !== undefined && key !== 'id' && key !== 'created_at' && key !== 'updated_at') {
        dataObject[key] = value;
    }
    });
    return dataObject;
};