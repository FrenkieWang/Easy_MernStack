const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const therapistSchema = new Schema({
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
  }
});


therapistSchema.pre('validate', function(next) {
  if (this.title === 'Other' && !this.titleOther) {
    this.invalidate('titleOther', 'Title must be specified if "Other" is selected');
  }
  next();
});

const Therapist = mongoose.model('Therapist', therapistSchema);

module.exports = Therapist;