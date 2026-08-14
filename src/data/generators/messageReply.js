export function getAutoReply(userText, conversation) {
  const text = userText.toLowerCase()
  const name = conversation.doctorName.includes('Support')
    ? 'Care Support'
    : conversation.doctorName.replace('Dr. ', 'Dr. ')

  if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
    return `Hello! This is ${name}. How can I help you today?`
  }
  if (text.includes('appointment') || text.includes('book') || text.includes('slot')) {
    return 'I can help with that. Please share your preferred date and time for the appointment.'
  }
  if (text.includes('shared a file') || text.includes('photo') || text.includes('attachment')) {
    return 'I received your file. I will review it and get back to you shortly.'
  }
  if (text.includes('report') || text.includes('ecg') || text.includes('lab')) {
    return 'Please upload or bring your latest reports. I will review them and guide you next.'
  }
  if (text.includes('medicine') || text.includes('tablet') || text.includes('dose')) {
    return 'Take medicines as prescribed. If you feel any side effects, message me right away.'
  }
  if (text.includes('thank')) {
    return 'You are welcome. Take care, and feel free to message anytime.'
  }
  if (text.includes('pain') || text.includes('fever') || text.includes('urgent')) {
    return 'Sorry you are unwell. Please share your symptoms in brief, or book an urgent consult.'
  }

  return `Thanks for your message. ${name} here — I will review this and get back to you shortly.`
}
