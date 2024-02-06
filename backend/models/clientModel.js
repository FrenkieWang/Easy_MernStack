const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clientSchema = new Schema({
  title: { 
    type: String, 
    required: true, 
    enum: ['Mx', 'Ms', 'Mr', 'Mrs', 'Miss', 'Dr', 'Other'] 
  },
  // If user select Other
  titleOther: {
    type: String
  },
  firstName: { 
    type: String, 
    required: true 
  },
  surName: { 
    type: String, 
    required: true 
  },
  phoneNumber: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  homeAddress: {
    addressLine1: { 
      type: String, 
      required: true 
    },
    addressLine2: String,
    town: { 
      type: String, 
      required: true 
    },
    countyCity: { 
      type: String, 
      required: true 
    },
    eircode: { 
      type: String
    }    
  },
  // 客户特有的额外个人信息
  dateOfBirth: { 
    type: Date, 
    required: true 
  },
  parentGuardianName: String, // 如果客户未满18岁，则此字段为必填
  permissionToLeaveMessage: { 
    type: String, 
    required: true,
    enum: ['Y', 'N'] 
  },
  gender: { 
    type: String, 
    required: true,
    enum: ['Male', 'Female', 'Prefer not to say']  
  },
  maritalStatus: { 
    type: String, 
    required: true,
    enum: ['Never Married', 'Domestic Partnership', 'Married', 'Separated', 'Divorced', 'Widowed'] 
  },
  referrer: String,
  recordCreationDate: { 
    type: Date, 
    default: Date.now // 自动记录创建日期
  }
});

// 创建前的校验，确保如果 title 是 'Other'，titleOther 必须被填写
clientSchema.pre('validate', function(next) {
  if (this.title === 'Other' && !this.titleOther) {
    this.invalidate('titleOther', 'Title must be specified if "Other" is selected');
  }
  next();
});

// 创建前的校验，确保如果客户未满18岁，则必须提供父母/监护人姓名
clientSchema.pre('validate', function(next) {
    if (this.dateOfBirth && new Date(this.dateOfBirth).getFullYear() > new Date().getFullYear() - 18 && !this.parentGuardianName) {
      this.invalidate('parentGuardianName', 'Parent/Guardian name is required for clients under 18');
    }
    next();
  });

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;