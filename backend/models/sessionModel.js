const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    sessionDate: {
      type: Date,
      required: true
    },
    sessionTime: {
      type: String, // 或者根据需要使用 Date 类型
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
      type: Number, // 假设费用是数字类型
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
    },
    genderPreference: { // 根据您的喜好选择实现方式
      type: String
    }
  });

// 创建前的校验，确保如果 sessionType 是 'Other'，sessionTypeOther 必须被填写
sessionSchema.pre('validate', function(next) {
    if (this.sessionType === 'Other' && !this.sessionTypeOther) {
      this.invalidate('sessionTypeOther', 'Session type must be specified if "Other" is selected');
    }
    next();
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;