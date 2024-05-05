import mongoose from 'mongoose';

const loginSchema = new mongoose.Schema({
    userName: { type: String },
    userEmail: { type: String },
    userPassword: { type: String},
    role : { type: String},
});
const LoginModel = mongoose.model('Logins', loginSchema);

export { LoginModel };

