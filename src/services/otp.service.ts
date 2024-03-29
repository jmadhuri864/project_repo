import { OTPclass } from "../entities/otp.entity";
import { AppDataSource } from "../utils/data-source";

const OTPRepository = AppDataSource.getRepository(OTPclass);

// export const saveotp = async (input: { email: string; hashedOTP: string }) => {
//     return await OTPRepository.save(OTPRepository.create(input));
// };

  