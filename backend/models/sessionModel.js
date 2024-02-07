const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    sessionDate: {
      type: Date,
      required: true
    },
    sessionTime: {
      type: String, 
      required: true
    },
    clients: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'Client', 
      required: true 
    }],
    therapist: { 
      type: Schema.Types.ObjectId, 
      ref: 'Therapist', 
      required: true 
    },
    fee: {
      type: Number, 
    },
    sessionNumber: {
      type: Number,
      required: true
    },
    sessionAttendance: {
      type: String,
      required: true,
      enum: ['Attended', 'Cancelled', 'No Show']
    },
    sessionType: {
      type: String,
      required: true,
      enum: ['Intake', 'Psychotherapy', 'Assessment', 'Other']
    },
    sessionTypeOther: { // 当 sessionType 为 'Other' 时使用
      type: String
    },
    sessionNotes: {
      type: String,
      required: true
    }
  });


sessionSchema.pre('validate', function(next) {
    // 确保如果 sessionType 是 'Other'，sessionTypeOther 必须被填写
    if (this.sessionType === 'Other' && !this.sessionTypeOther) {
      this.invalidate('sessionTypeOther', 'Session type must be specified if "Other" is selected');
    }

    // 验证 clients 数组长度在 1 到 3 之间
    if (this.clients.length < 1 || this.clients.length > 3) {
      this.invalidate('clients', 'Clients array must contain 1 to 3 clients');
    }

    // 确保 therapist 字段不为空
    if (!this.therapist) {
      this.invalidate('therapist', 'Therapist field is required');
    }
    
    next();
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;