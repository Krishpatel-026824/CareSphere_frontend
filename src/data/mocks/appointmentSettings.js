export const appointmentSettingsMock = {
  'apt-1': {
    defaults: {
      visitReminders: true,
      emailUpdates: true,
      whatsappAlerts: true,
      shareRecords: true,
    },
    reminderTiming: '1 day before',
    extras: [
      {
        id: 'ecgShare',
        label: 'Auto-share ECG reports',
        hint: 'Send previous ECG files to CareSphere Heart Center',
        defaultOn: true,
      },
      {
        id: 'fastingReminder',
        label: 'Fasting reminder',
        hint: 'Alert 8 hours before cardiac tests',
        defaultOn: true,
      },
    ],
  },
  'apt-2': {
    defaults: {
      visitReminders: true,
      emailUpdates: true,
      whatsappAlerts: false,
      shareRecords: true,
    },
    reminderTiming: '1 hour before',
    extras: [
      {
        id: 'skinPhotos',
        label: 'Skin photo reminder',
        hint: 'Prompt to upload clear photos before the visit',
        defaultOn: true,
      },
      {
        id: 'noMakeup',
        label: 'Avoid makeup reminder',
        hint: 'Notify on the morning of your dermatology visit',
        defaultOn: true,
      },
    ],
  },
  'apt-3': {
    defaults: {
      visitReminders: false,
      emailUpdates: true,
      whatsappAlerts: false,
      shareRecords: true,
    },
    reminderTiming: '1 day before',
    extras: [
      {
        id: 'labShare',
        label: 'Share lab reports',
        hint: 'Keep CBC and follow-up notes available to the clinic',
        defaultOn: true,
      },
      {
        id: 'rxAlerts',
        label: 'Prescription alerts',
        hint: 'Email when a new prescription is added',
        defaultOn: true,
      },
    ],
  },
  'apt-4': {
    defaults: {
      visitReminders: true,
      emailUpdates: true,
      whatsappAlerts: true,
      shareRecords: true,
    },
    reminderTiming: '1 day and 1 hour before',
    extras: [
      {
        id: 'ecgPack',
        label: 'ECG pack reminder',
        hint: 'Remind to bring previous ECG and lipid reports',
        defaultOn: true,
      },
      {
        id: 'medList',
        label: 'Medication list reminder',
        hint: 'Prompt to note current heart medicines',
        defaultOn: true,
      },
    ],
  },
  'apt-5': {
    defaults: {
      visitReminders: true,
      emailUpdates: true,
      whatsappAlerts: true,
      shareRecords: true,
    },
    reminderTiming: '1 day before',
    extras: [
      {
        id: 'vaccineCard',
        label: 'Immunization card reminder',
        hint: 'Pack the vaccination card before you leave',
        defaultOn: true,
      },
      {
        id: 'guardianAlerts',
        label: 'Parent / guardian alerts',
        hint: 'Send visit updates to the registered guardian',
        defaultOn: true,
      },
    ],
  },
}

export const reminderTimingOptions = ['1 hour before', '1 day before', '1 day and 1 hour before']
