import bcrypt from 'bcrypt';

export const createDataObject = async (body) => {
    let dataObject = {};    
    for (const [key, value] of Object.entries(body)) {
        if (key === 'password') {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(body.password, salt);
            dataObject[key] = hash;
        } 
        if (value !== undefined && key !== 'id' && key !== 'created_at' && key !== 'updated_at' && key!== 'password') {
            dataObject[key] = value;
        }       
    }
    return dataObject;
};