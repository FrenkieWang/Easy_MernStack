const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clientSchema = new Schema({
  title: { 
    type: String, 
    required: true, 
    enum: ['Mx', 'Ms', 'Mr', 'Mrs', 'Miss', 'Dr', 'Other'] 
  },
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
  // Additional Information
  dateOfBirth: { 
    type: Date, 
    required: true 
  },
  parentGuardianName: String, 
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
    default: Date.now // Automatically record the Date for Client Record Creation
  }
});


clientSchema.pre('validate', function(next) {
  if (this.title === 'Other' && !this.titleOther) {
    this.invalidate('titleOther', 'Title must be specified if "Other" is selected');
  }

  if (this.dateOfBirth && new Date(this.dateOfBirth).getFullYear() > new Date().getFullYear() - 18 && !this.parentGuardianName) {
    this.invalidate('parentGuardianName', 'Parent/Guardian name is required for clients under 18');
  }

  next();
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;