import bcrypt from "bcryptjs";
export const hashData = async (data: string, saltRounds = 10): Promise<string> => {
    try {
        const hashedData = await bcrypt.hash(data, saltRounds);
        return hashedData;
    } catch (error) {
        throw error;
    }
};

export const verifyHashedData = async (unhashed: string, hashed: string): Promise<boolean> => {
    try {
        const match = await bcrypt.compare(unhashed, hashed);
        return match;
    } catch (error) {
        throw error;
    }
};