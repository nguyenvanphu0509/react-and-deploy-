import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
        console.log("connect sb is success");
    } catch (error) {
        console.log("error when connect db");
        process.exit(1); // 1 exit with status failure, 0 is exit with status success
    }
};
